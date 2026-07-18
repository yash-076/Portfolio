import { useState, useEffect, useRef } from 'react'
import './Hero.css'

const ROLES = [
  'Backend Developer',
  'Full Stack Engineer',
  'System Architect',
  'Competitive Programmer',
]

// Map of exact vector paths matching the background SVG lines
const PATHS = {
  'path-windows-gateway': 'M 60 30 L 75 30 Q 85 30 85 55 L 85 70 L 95 70',
  'path-linux-gateway': 'M 60 70 L 95 70',
  'path-web-gateway': 'M 60 110 L 75 110 Q 85 110 85 85 L 85 70 L 95 70',
  'path-gateway-kafka': 'M 155 70 L 175 70',
  'path-kafka-engine': 'M 245 70 L 255 70 Q 260 70 260 100 L 260 110 L 175 110',
  'path-engine-dedupe': 'M 245 107.5 L 255 107.5 Q 260 107.5 260 90 L 260 20 Q 260 5 210 5 L 165 5 L 165 27.5 L 175 27.5',
  'path-dedupe-kafka': 'M 245 27.5 L 255 27.5 L 255 45 L 165 45 L 165 67.5 L 175 67.5',
  'path-kafka-pub': 'M 245 67.5 L 255 67.5 Q 260 67.5 260 62.5 L 265 62.5',
  'path-pub-postgres': 'M 290 75 L 290 90',
  'path-pub-ws': 'M 290 75 L 255 75 Q 250 75 250 80 L 250 135 Q 250 142.5 260 142.5 L 265 142.5',
  'path-ws-dashboard': 'M 265 145 L 250 145 Q 240 145 240 165 L 240 170 L 235 170',
}

// Normal logs
const NORMAL_LOGS = [
  'GET /assets/index.js HTTP/1.1 200 OK',
  'User yash_r logged out successfully.',
  'GET /api/v1/healthcheck status: healthy',
  'DB connection pool refreshed. Active connections: 4',
  'GET /dashboard session cookie renewed.',
]

// Malicious logs that trigger alerts
const THREAT_LOGS = [
  {
    source: 'WEB_AGENT',
    log: 'POST /logs { msg: "UNION SELECT username, password FROM users" }',
    engine: 'WebAlertEngine',
    match: 'SQL_INJECTION_ATTEMPT',
    severity: 'CRITICAL',
  },
  {
    source: 'WIN_AGENT',
    log: 'security event 4625: logon failure for user: administrator',
    engine: 'WindowsAlertEngine',
    match: 'BRUTE_FORCE_LOGON',
    severity: 'HIGH',
  },
  {
    source: 'LINUX_AGENT',
    log: 'sshd: auth failure; session opened for user root by admin',
    engine: 'LinuxAlertEngine',
    match: 'ROOT_PRIVILEGE_ATTEMPT',
    severity: 'HIGH',
  },
]

function useTypewriter(words) {
  const [display, setDisplay] = useState('')
  const [wordIdx, setWordIdx] = useState(0)
  const [charIdx, setCharIdx] = useState(0)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const current = words[wordIdx]
    let timeout

    if (!deleting && charIdx === current.length) {
      timeout = setTimeout(() => setDeleting(true), 1800)
    } else if (deleting && charIdx === 0) {
      setDeleting(false)
      setWordIdx((i) => (i + 1) % words.length)
      timeout = setTimeout(() => { }, 400)
    } else {
      const next = deleting ? charIdx - 1 : charIdx + 1
      timeout = setTimeout(() => {
        setDisplay(current.substring(0, next))
        setCharIdx(next)
      }, deleting ? 38 : 75)
    }

    return () => clearTimeout(timeout)
  }, [charIdx, deleting, wordIdx, words])

  return display
}

export default function Hero() {
  const typed = useTypewriter(ROLES)
  const [terminalLogs, setTerminalLogs] = useState([])
  const [clickCount, setClickCount] = useState(0)
  const [activePackets, setActivePackets] = useState([]) // multiple concurrent packets
  const [dashboardStatus, setDashboardStatus] = useState('IDLE') // IDLE | OK | ALERT
  const consoleRef = useRef(null)

  useEffect(() => {
    if (consoleRef.current) {
      consoleRef.current.scrollTop = consoleRef.current.scrollHeight
    }
  }, [terminalLogs])

  // Helper to spawn a packet and remove it exactly when the animation ends
  const spawnPacket = (pathKey, color, durMs) => {
    const packetId = Date.now() + Math.random()
    const pathString = PATHS[pathKey]

    setActivePackets(prev => [...prev, {
      id: packetId,
      path: pathString,
      color,
      dur: `${durMs / 1000}s`
    }])
    setTimeout(() => {
      setActivePackets(prev => prev.filter(p => p.id !== packetId))
    }, durMs)
  }

  // Fires a single normal gold log ball from agentType
  const fireNormalFlow = (agentType) => {
    const logMsg = NORMAL_LOGS[Math.floor(Math.random() * NORMAL_LOGS.length)]
    const agentPathKey = `path-${agentType.toLowerCase()}-gateway`

    spawnPacket(agentPathKey, '#C9A84C', 1500)
    setTerminalLogs(prev => [...prev, `[INGRESS] ${agentType}_AGENT generated raw log: "${logMsg}"`])

    setTimeout(() => {
      setTerminalLogs(prev => [...prev, `[FASTAPI] Ingest Route verified. Ingesting to Kafka queue...`])
      spawnPacket('path-gateway-kafka', '#C9A84C', 1500)
    }, 1500)

    setTimeout(() => {
      setTerminalLogs(prev => [...prev, `[KAFKA] Log published to topic. Rule Engine executing signatures...`])
      spawnPacket('path-kafka-engine', '#C9A84C', 2000)
    }, 3000)

    setTimeout(() => {
      setDashboardStatus('OK')
      setTerminalLogs(prev => [...prev, `[ENGINE] Scan complete. Normal traffic. Event discarded.`])
      setTimeout(() => setDashboardStatus('IDLE'), 1500)
    }, 5000)
  }

  // Fires a single suspicious red alert ball from agentType
  const fireThreatFlow = (agentType) => {
    const sc = THREAT_LOGS[Math.floor(Math.random() * THREAT_LOGS.length)]
    const agentPathKey = `path-${agentType.toLowerCase()}-gateway`

    spawnPacket(agentPathKey, '#FF4A4A', 1000)
    setTerminalLogs(prev => [...prev, `[INGRESS] 🚨 THREAT from ${agentType}_AGENT: "${sc.log}"`])

    setTimeout(() => {
      setTerminalLogs(prev => [...prev, `[FASTAPI] Malicious payload detected. Queuing to Kafka...`])
      spawnPacket('path-gateway-kafka', '#FF4A4A', 1000)
    }, 1000)

    setTimeout(() => {
      setTerminalLogs(prev => [...prev, `[KAFKA] Ingested. Rules Engine reading queue...`])
      spawnPacket('path-kafka-engine', '#FF4A4A', 1500)
    }, 2000)

    setTimeout(() => {
      setTerminalLogs(prev => [...prev,
      `[ENGINE] Match in ${sc.engine}: ${sc.match}! [${sc.severity}]`,
        `[ENGINE] Forwarding alert to Redis Dedup Cache...`
      ])
      spawnPacket('path-engine-dedupe', '#FF4A4A', 1500)
    }, 3500)

    setTimeout(() => {
      setTerminalLogs(prev => [...prev,
        `[REDIS] Cache miss. Unique event. Queueing to Kafka alert partition...`
      ])
      spawnPacket('path-dedupe-kafka', '#FF4A4A', 1500)
    }, 5000)

    setTimeout(() => {
      setTerminalLogs(prev => [...prev, `[KAFKA] Alert broadcasted. Redis Pub/Sub reading...`])
      spawnPacket('path-kafka-pub', '#FF4A4A', 1000)
    }, 6500)

    setTimeout(() => {
      setTerminalLogs(prev => [...prev, `[REDIS] Alert received. Writing to PostgreSQL (Storage) & WebSocket (Stream) in parallel...`])
      spawnPacket('path-pub-postgres', '#FF4A4A', 1000)
      spawnPacket('path-pub-ws', '#FF4A4A', 2000) // Longer curved bypass route
    }, 7500)

    setTimeout(() => {
      setTerminalLogs(prev => [...prev, `[POSTGRES] Event transaction committed successfully.`])
    }, 8500)

    setTimeout(() => {
      setTerminalLogs(prev => [...prev, `[WEBSOCKET] Push daemon thread dispatching alert push events...`])
      spawnPacket('path-ws-dashboard', '#FF4A4A', 1500)
    }, 9500)

    setTimeout(() => {
      setDashboardStatus('ALERT')
      setTerminalLogs(prev => [...prev, `[REACT BOARD] 🛡️ 🚨 SOC ALARM: ${sc.match} INGESTED!`])
      setTimeout(() => setDashboardStatus('IDLE'), 3000)
    }, 11000)
  }

  const triggerLogFlow = (agentType) => {
    const nextClickCount = clickCount + 1
    setClickCount(nextClickCount)

    // Every click fires a normal gold ball
    fireNormalFlow(agentType)

    // Every 3rd click ALSO fires a concurrent red suspicious ball
    if (nextClickCount % 3 === 0) {
      // Small random offset (200-600ms) so it feels like a separate packet
      const offset = 200 + Math.floor(Math.random() * 400)
      setTimeout(() => fireThreatFlow(agentType), offset)
    }
  }




  return (
    <section id="hero" className="hero">
      <div className="container hero-inner">

        {/* ── LEFT COLUMN ── */}
        <div className="hero-left">
          <div className="hero-badge">[ BACKEND DEV &nbsp;·&nbsp; FULL STACK ENGINEER  ]</div>

          <h1 className="hero-name">
            <span className="name-solid">YASH</span>
            <span className="name-outline">RASTOGI</span>
          </h1>

          <div className="hero-divider" />

          <p className="hero-typewriter">
            &gt;&nbsp;{typed}<span className="cursor">_</span>
          </p>

          <div className="hero-stats">
            {[
              { num: '1400+', label: 'DSA Solved' },
              { num: '5+', label: 'Projects' },
              { num: '1880+', label: 'LC Rating' },
              { num: '8.65', label: 'CGPA' },
            ].map(({ num, label }) => (
              <div key={label} className="stat-box">
                <span className="stat-num">{num}</span>
                <span className="stat-label">{label}</span>
              </div>
            ))}
          </div>

          <div className="hero-ctas">
            <a href="#projects" className="btn-primary">▸&nbsp;VIEW PROJECTS</a>
            <a href="#contact" className="btn-secondary">⟶&nbsp;CONTACT ME</a>
          </div>
        </div>

        {/* ── RIGHT COLUMN — Clickable Backend Pipeline Simulator ── */}
        <div className="hero-right">
          <div className="sim-panel">
            <div className="sim-panel-header">
              <span className="sim-dot dot-yellow" />
              <span className="sim-title">secuwatch-pipeline // CLICK AN AGENT TO GENERATE LOGS</span>
            </div>

            {/* High-Resolution Interactive Flow Diagram */}
            <div className="sim-map-wrapper">
              <svg className="sim-map-svg" viewBox="0 0 320 220">
                {/* Connecting Lines */}
                {/* Windows Agent to Gateway */}
                <path d="M 60 30 L 75 30 Q 85 30 85 55 L 85 70 L 95 70" className="sim-path" />
                {/* Linux Agent to Gateway */}
                <path d="M 60 70 L 95 70" className="sim-path" />
                {/* Web Agent to Gateway */}
                <path d="M 60 110 L 75 110 Q 85 110 85 85 L 85 70 L 95 70" className="sim-path" />

                {/* Gateway to Redis Deduplicator */}
                <path d="M 155 70 Q 165 70 165 40 L 165 30 L 175 30" className="sim-path" />
                {/* Gateway to Kafka */}
                <path d="M 155 70 L 175 70" className="sim-path" />
                {/* Gateway to Alert Engine */}
                <path d="M 155 70 Q 165 70 165 100 L 165 110 L 175 110" className="sim-path" />

                {/* Engine to Redis Cache Deduplicator */}
                <path d="M 245 107.5 L 255 107.5 Q 260 107.5 260 90 L 260 20 Q 260 5 210 5 L 165 5 L 165 27.5 L 175 27.5" className="sim-path" />
                {/* Redis Dedupe to Kafka */}
                <path d="M 245 27.5 L 255 27.5 L 255 45 L 165 45 L 165 67.5 L 175 67.5" className="sim-path" />
                {/* Kafka to Redis Pub/Sub */}
                <path id="path-kafka-pub" d="M 245 67.5 L 255 67.5 Q 260 67.5 260 62.5 L 265 62.5" className="sim-path" />
                {/* Redis Pub/Sub to Postgres */}
                <path id="path-pub-postgres" d="M 290 75 L 290 90" className="sim-path" />
                {/* Redis Pub/Sub to WebSocket (Parallel Bypass Route) */}
                <path id="path-pub-ws" d="M 290 75 L 255 75 Q 250 75 250 80 L 250 135 Q 250 142.5 260 142.5 L 265 142.5" className="sim-path" />

                {/* WebSockets back to React UI dashboard */}
                <path d="M 265 145 L 250 145 Q 240 145 240 165 L 240 170 L 235 170" className="sim-path" />

                {/* Active Dynamic Packets running along paths */}
                {activePackets.map(p => (
                  <circle
                    key={p.id}
                    r="3.5"
                    fill={p.color}
                    className="sim-packet-dot"
                    style={{
                      '--path': `path('${p.path}')`,
                      '--dur': p.dur
                    }}
                  />
                ))}

                {/* --- CLICKABLE NODES --- */}

                {/* Agent 1: Windows */}
                <g className="sim-node clickable" onClick={() => triggerLogFlow('WINDOWS')}>
                  <rect x="5" y="15" width="55" height="25" rx="2" />
                  <text x="32" y="30" className="node-lbl">WIN_AGENT</text>
                  <text x="32" y="37" className="node-lbl-sub">Windows Event</text>
                </g>

                {/* Agent 2: Linux */}
                <g className="sim-node clickable" onClick={() => triggerLogFlow('LINUX')}>
                  <rect x="5" y="55" width="55" height="25" rx="2" />
                  <text x="32" y="70" className="node-lbl">LINUX_AGENT</text>
                  <text x="32" y="77" className="node-lbl-sub">Syslog Daemon</text>
                </g>

                {/* Agent 3: Web */}
                <g className="sim-node clickable" onClick={() => triggerLogFlow('WEB')}>
                  <rect x="5" y="95" width="55" height="25" rx="2" />
                  <text x="32" y="110" className="node-lbl">WEB_AGENT</text>
                  <text x="32" y="117" className="node-lbl-sub">HTTP Log Stream</text>
                </g>

                {/* Ingestion: FastAPI Gateway */}
                <g className="sim-node">
                  <rect x="95" y="55" width="60" height="30" rx="2" />
                  <text x="125" y="71" className="node-lbl">FASTAPI API</text>
                  <text x="125" y="79" className="node-lbl-sub">Verify API Key</text>
                </g>

                {/* Component: Redis Deduplicator */}
                <g className="sim-node">
                  <rect x="175" y="15" width="70" height="25" rx="2" />
                  <text x="210" y="29" className="node-lbl">REDIS_CACHE</text>
                  <text x="210" y="36" className="node-lbl-sub">Deduplicator</text>
                </g>

                {/* Component: Kafka Broker */}
                <g className="sim-node">
                  <rect x="175" y="55" width="70" height="25" rx="2" />
                  <text x="210" y="69" className="node-lbl">KAFKA_BROKER</text>
                  <text x="210" y="76" className="node-lbl-sub">"logs/alerts" partition</text>
                </g>

                {/* Component: Alert Engines Factory */}
                <g className="sim-node">
                  <rect x="175" y="95" width="70" height="25" rx="2" />
                  <text x="210" y="109" className="node-lbl">RULE_ENGINE</text>
                  <text x="210" y="116" className="node-lbl-sub">Alert Engines</text>
                </g>

                {/* PubSub: Redis Relay */}
                <g className="sim-node">
                  <rect x="265" y="50" width="50" height="25" rx="2" />
                  <text x="290" y="64" className="node-lbl">REDIS_PUBSUB</text>
                  <text x="290" y="71" className="node-lbl-sub">Relay workers</text>
                </g>

                {/* Storage: PostgreSQL */}
                <g className="sim-node">
                  <rect x="265" y="90" width="50" height="25" rx="2" />
                  <text x="290" y="104" className="node-lbl">POSTGRES</text>
                  <text x="290" y="111" className="node-lbl-sub">DB Storage</text>
                </g>

                {/* Output: WebSockets Broker */}
                <g className="sim-node">
                  <rect x="265" y="130" width="50" height="25" rx="2" />
                  <text x="290" y="144" className="node-lbl">WEBSOCKET</text>
                  <text x="290" y="151" className="node-lbl-sub">Push Daemon</text>
                </g>

                {/* Final Target: React Dashboard */}
                <g className={`sim-node ${dashboardStatus === 'ALERT' ? 'error' : dashboardStatus === 'OK' ? 'success' : ''}`}>
                  <rect x="85" y="160" width="150" height="25" rx="2" />
                  <text x="160" y="174" className="node-lbl">REACT SOC DASHBOARD</text>
                  <text x="160" y="181" className="node-lbl-sub">
                    {dashboardStatus === 'IDLE' && 'STATUS: LISTENING...'}
                    {dashboardStatus === 'OK' && 'STATUS: LOG COMMITTED [OK]'}
                    {dashboardStatus === 'ALERT' && '🚨 CRITICAL ALERT INGESTED 🚨'}
                  </text>
                </g>
              </svg>
            </div>

            {/* Terminal Live logs */}
            <div className="sim-console">
              <div ref={consoleRef} className="console-lines">
                {terminalLogs.length === 0 && (
                  <div className="console-placeholder">Click any Agent node on the left to fire logs...</div>
                )}
                {terminalLogs.map((log, idx) => (
                  <div key={idx} className="console-line">
                    <span className="console-prompt">&gt;</span> {log}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
