import React, { useMemo, useState } from "react";
import {
  AlertTriangle,
  BarChart3,
  ChevronRight,
  ClipboardList,
  Clock3,
  Map,
  MonitorPlay,
  Plane,
  Radar,
  ShieldAlert,
  UserCheck,
  Video,
} from "lucide-react";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  LineChart,
  Line,
} from "recharts";
import "./App.css";

/**
 * PURE REACT + CSS VERSION
 * No Tailwind
 * No shadcn/ui
 * No extra UI dependencies
 *
 * Search this exact phrase to find all places where you should replace assets:
 * >>> REPLACE WITH YOUR OWN ASSET <<<
 */

const ASSETS = {
  logo: "/assets/project-logo.png", // >>> REPLACE WITH YOUR OWN ASSET <<<
  liveMissionVideo: "/assets/mission-demo.mp4", // >>> REPLACE WITH YOUR OWN ASSET <<<
  siteMap: "/assets/site-map.png", // >>> REPLACE WITH YOUR OWN ASSET <<<
  detectionMain: "/assets/detection-main.png", // >>> REPLACE WITH YOUR OWN ASSET <<<
  alertThumb1: "/assets/alert-1.png", // >>> REPLACE WITH YOUR OWN ASSET <<<
  alertThumb2: "/assets/alert-2.png", // >>> REPLACE WITH YOUR OWN ASSET <<<
  alertThumb3: "/assets/alert-3.png", // >>> REPLACE WITH YOUR OWN ASSET <<<
  alertThumb4: "/assets/alert-4.png", // >>> REPLACE WITH YOUR OWN ASSET <<<
  compare1: "/assets/compare-1.png", // >>> REPLACE WITH YOUR OWN ASSET <<<
  compare2: "/assets/compare-2.png", // >>> REPLACE WITH YOUR OWN ASSET <<<
  compare3: "/assets/compare-3.png", // >>> REPLACE WITH YOUR OWN ASSET <<<
  reportPreview: "/assets/report-preview.png", // >>> REPLACE WITH YOUR OWN ASSET <<<
};

const NAV_ITEMS = [
  { key: "overview", label: "Overview", icon: BarChart3 },
  { key: "missions", label: "Mission Monitor", icon: MonitorPlay },
  { key: "detections", label: "AI Detection", icon: Radar },
  { key: "comparisons", label: "Comparisons", icon: Video },
  { key: "riskmap", label: "Risk Map", icon: Map },
  { key: "alerts", label: "Alerts", icon: ShieldAlert },
  { key: "review", label: "Engineer Review", icon: UserCheck },
  { key: "reports", label: "Reports", icon: ClipboardList },
];

const missions = [
  {
    id: "MSN-ALPHA-01",
    droneId: "DRN-07",
    zone: "Zone B / Temporary Access Corridor",
    battery: 74,
    signal: 89,
    progress: 68,
    duration: "14 min",
    mode: "Autonomous Patrol",
    status: "In Progress",
    video: ASSETS.liveMissionVideo,
    routeCoverage: 68,
    lastEvent: "Repeated obstruction flagged",
  },
  {
    id: "MSN-BRAVO-02",
    droneId: "DRN-03",
    zone: "Zone D / Scaffolding Edge",
    battery: 58,
    signal: 81,
    progress: 91,
    duration: "21 min",
    mode: "Semi-Autonomous",
    status: "Review Pending",
    video: ASSETS.liveMissionVideo,
    routeCoverage: 91,
    lastEvent: "Edge protection issue detected",
  },
  {
    id: "MSN-CHARLIE-03",
    droneId: "DRN-11",
    zone: "Zone A / Material Storage",
    battery: 83,
    signal: 93,
    progress: 42,
    duration: "09 min",
    mode: "Autonomous Patrol",
    status: "In Progress",
    video: ASSETS.liveMissionVideo,
    routeCoverage: 42,
    lastEvent: "Unsafe material stacking detected",
  },
];

const kpiCards = [
  { title: "Total Inspections Today", value: "12", sub: "+3 vs yesterday", icon: Plane },
  { title: "Active Drones", value: "3", sub: "2 autonomous / 1 semi-auto", icon: MonitorPlay },
  { title: "Risks Detected", value: "18", sub: "6 new in latest cycle", icon: AlertTriangle },
  { title: "High-Risk Cases", value: "4", sub: "Require urgent review", icon: ShieldAlert },
  { title: "Unresolved Issues", value: "7", sub: "Awaiting engineer decision", icon: Clock3 },
];

const severityPieData = [
  { name: "Critical", value: 2 },
  { name: "High", value: 4 },
  { name: "Medium", value: 7 },
  { name: "Low", value: 5 },
];

const zoneRiskData = [
  { zone: "Zone A", risks: 4 },
  { zone: "Zone B", risks: 6 },
  { zone: "Zone C", risks: 3 },
  { zone: "Zone D", risks: 5 },
];

const trendData = [
  { cycle: "C1", count: 5 },
  { cycle: "C2", count: 7 },
  { cycle: "C3", count: 9 },
  { cycle: "C4", count: 6 },
  { cycle: "C5", count: 8 },
  { cycle: "C6", count: 4 },
];

const detections = [
    {
  id: "R-001",
  category: "Smoking Activity Detected",
  confidence: 0.94,
  timestamp: "14:41",
  zone: "Zone D",
  severity: "Critical",
  image: ASSETS.alertThumb2,
  description: "Smoking behavior was detected in a restricted site zone with elevated fire risk.",
  },
   {
  id: "R-002",
  category: "Hot Spot Detected",
  confidence: 0.93,
  timestamp: "15:30",
  zone: "Zone A",
  severity: "High",
  image: ASSETS.alertThumb3,
  description: "Hot spot detected in a high-temperature area through thermo camera.",
  },
  {
    id: "R-003",
    category: "Unsafe Material Stacking",
    confidence: 0.91,
    timestamp: "14:12",
    zone: "Zone A",
    severity: "High",
    image: ASSETS.detectionMain,
    description: "Material stack exceeds safe arrangement boundary and blocks operator movement margin.",
  },
  {
    id: "R-004",
    category: "Blocked Access Route",
    confidence: 0.86,
    timestamp: "14:26",
    zone: "Zone B",
    severity: "Medium",
    image: ASSETS.alertThumb1,
    description: "Temporary access route partially obstructed by construction debris.",
  },
   {
    id: "R-005",
    category: "Hot Work in process",
    confidence: 0.82,
    timestamp: "16:20",
    zone: "Zone B",
    severity: "Medium",
    image: ASSETS.alertThumb4,
    description: "Hot works is in process.",
  }
];

const comparisonData = {
  title: "Repeated thermal hotspot in restricted site area",
  zone: "Zone B",
  firstObserved: "2026-03-14 09:42",
  lastObserved: "2026-03-15 14:26",
  repeatCount: 3,
  correctiveActionObserved: "No",
  severityTrend: "Low → Medium → High",
  recommendation: "Immediate engineer verification is required. Inspect the area for ignition sources, overheating equipment, or combustible materials near the hotspot.",
  images: [
    { label: "Inspection 1", src: ASSETS.compare1 },
    { label: "Inspection 2", src: ASSETS.compare2 },
    { label: "Inspection 3", src: ASSETS.compare3 },
  ],
};

const siteRiskPoints = [
  {
    id: "P1",
    name: "Zone A",
    type: "Unsafe Material Stacking",
    severity: "High",
    top: "60%",
    left: "46%",
    status: "Pending Review",
    firstDetected: "13:10",
    lastDetected: "14:12",
    repeat: 1,
  },
  {
    id: "P2",
    name: "Zone B",
    type: "Blocked Access Route",
    severity: "High",
    top: "40%",
    left: "40%",
    status: "Awaiting Action",
    firstDetected: "09:42",
    lastDetected: "14:26",
    repeat: 3,
  },
  {
    id: "P3",
    name: "Zone D",
    type: "Smoking Activity Detected",
    severity: "Critical",
    top: "18%",
    left: "70%",
    status: "Escalated",
    firstDetected: "14:41",
    lastDetected: "14:41",
    repeat: 1,
  },
];

const initialAlerts = [
  {
    id: "ALT-001",
    title: "Unsafe material stacking detected",
    severity: "High",
    zone: "Zone A",
    time: "14:12",
    status: "Awaiting Review",
    reason: "Material stacking exceeds safe arrangement boundary and blocks operator movement margin.",
    suggestedAction: "Assign a team to rearrange the materials to a safe configuration and clear the access path.",
    thumb: ASSETS.alertThumb1,
  },
  {
    id: "ALT-002",
    title: "Smoking Activity Detected",
    severity: "Critical",
    zone: "Zone D",
    time: "14:41",
    status: "Escalated",
    reason: "A worker was detected smoking in a fire-sensitive construction zone.",
    suggestedAction: "Immediately stop the unsafe behavior and dispatch site staff for on-site intervention.",
    thumb: ASSETS.alertThumb2,
  },
  {
    id: "ALT-003",
    title: "Hot Spot Detected",
    severity: "High",
    zone: "Zone A",
    time: "15:30",
    status: "Pending Assignment",
    reason: "Temperature exceeded safe threshold.",
    suggestedAction: "Assign maintenance team to inspect the area for potential fire hazards and mitigate the issue.",
    thumb: ASSETS.alertThumb3,
  },
  {
    id: "ALT-004",
    title: "Hot Work in progress",
    severity: "Medium",
    zone: "Zone B",
    time: "16:20",
    status: "Pending Assignment",
    reason: "Hot work detected.",
    suggestedAction: "Confirm wheather this hot work is authorized and ensure proper safety measures are in place.",
    thumb: ASSETS.alertThumb4,
  }
];

function severityClass(severity) {
  if (severity === "Critical") return "badge critical";
  if (severity === "High") return "badge high";
  if (severity === "Medium") return "badge medium";
  return "badge low";
}

function Card({ children, className = "" }) {
  return <div className={`card ${className}`}>{children}</div>;
}

function SectionTitle({ icon: Icon, title, sub }) {
  return (
    <div className="section-title">
      <div className="section-title-left">
        <div className="icon-box"><Icon size={16} /></div>
        <div>
          <h3>{title}</h3>
          {sub ? <p>{sub}</p> : null}
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, sub, icon: Icon }) {
  return (
    <Card>
      <div className="stat-card">
        <div>
          <div className="muted small">{title}</div>
          <div className="stat-value">{value}</div>
          <div className="muted xs">{sub}</div>
        </div>
        <div className="icon-box large"><Icon size={18} /></div>
      </div>
    </Card>
  );
}

function ProgressBar({ value }) {
  return (
    <div className="progress-bar">
      <div className="progress-fill" style={{ width: `${value}%` }} />
    </div>
  );
}

function SeverityBadge({ severity }) {
  return <span className={severityClass(severity)}>{severity}</span>;
}

function InfoBlock({ label, value }) {
  return (
    <div className="info-block">
      <div className="muted xs">{label}</div>
      <div className="info-value">{value}</div>
    </div>
  );
}

function Sidebar({ activePage, setActivePage }) {
  return (
    <aside className="sidebar">
      <div className="brand">
        <div className="brand-logo">
          <img src={ASSETS.logo} alt="Project logo" />
        </div>
        <div>
          <div className="muted small">Demo System</div>
          <div className="brand-title">AI-Drones Inspection System</div>
        </div>
      </div>

      <div className="nav-list">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const active = activePage === item.key;
          return (
            <button
              key={item.key}
              className={`nav-item ${active ? "active" : ""}`}
              onClick={() => setActivePage(item.key)}
            >
              <div className="nav-item-left">
                <Icon size={16} />
                <span>{item.label}</span>
              </div>
              {active ? <ChevronRight size={16} /> : null}
            </button>
          );
        })}
      </div>

      <Card className="status-card">
        <div className="muted xs upper">System Status</div>
        <div className="status-row">
          <span className="status-dot" />
          <span>Demo mode active</span>
        </div>
        <p className="muted xs line-space">
          Human-supervised AI drone inspection dashboard for construction site risk monitoring.
        </p>
      </Card>
    </aside>
  );
}

function TopBar({ selectedMissionId, setSelectedMissionId }) {
  return (
    <div className="topbar">
      <div>
        <div className="muted xs upper">Control Center</div>
        <h1>AI-Enhanced Construction Inspection Dashboard</h1>
      </div>

      <div className="topbar-right">
        <div className="operator-box">
          <div className="muted xs">Operator</div>
          <div className="operator-name">Engineer Review Account</div>
        </div>

        <select
          className="select"
          value={selectedMissionId}
          onChange={(e) => setSelectedMissionId(e.target.value)}
        >
          {missions.map((mission) => (
            <option key={mission.id} value={mission.id}>
              {mission.id}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

function RightRail({ alerts, selectedAlert, setSelectedAlert, selectedMission }) {
  return (
    <aside className="right-rail">
      <Card>
        <div className="card-inner">
          <h3 className="panel-heading">Current Mission</h3>
          <div className="kv-row"><span>Mission ID</span><strong>{selectedMission.id}</strong></div>
          <div className="kv-row"><span>Drone ID</span><strong>{selectedMission.droneId}</strong></div>
          <div className="kv-row"><span>Zone</span><strong>{selectedMission.zone}</strong></div>
          <div className="kv-row"><span>Status</span><strong>{selectedMission.status}</strong></div>
          <div className="progress-group">
            <div className="progress-label"><span>Coverage progress</span><span>{selectedMission.routeCoverage}%</span></div>
            <ProgressBar value={selectedMission.routeCoverage} />
          </div>
        </div>
      </Card>

      <Card>
        <div className="card-inner">
          <h3 className="panel-heading">Live Alerts</h3>
          <div className="stack gap-sm">
            {alerts.map((alert) => (
              <button
                key={alert.id}
                className={`mini-alert ${selectedAlert?.id === alert.id ? "active" : ""}`}
                onClick={() => setSelectedAlert(alert)}
              >
                <div className="mini-alert-top">
                  <span>{alert.title}</span>
                  <SeverityBadge severity={alert.severity} />
                </div>
                <div className="muted xs">{alert.zone} · {alert.time}</div>
              </button>
            ))}
          </div>
        </div>
      </Card>

      <Card>
        <div className="card-inner">
          <h3 className="panel-heading">Selected Alert</h3>
          {selectedAlert ? (
            <>
              <img src={selectedAlert.thumb} alt={selectedAlert.title} className="thumb-lg" />
              <div className="kv-row"><span>ID</span><strong>{selectedAlert.id}</strong></div>
              <div className="kv-row"><span>Status</span><strong>{selectedAlert.status}</strong></div>
              <div>
                <div className="muted xs">Reason</div>
                <p className="body-copy">{selectedAlert.reason}</p>
              </div>
              <div>
                <div className="muted xs">Suggested Action</div>
                <p className="body-copy">{selectedAlert.suggestedAction}</p>
              </div>
            </>
          ) : (
            <p className="muted small">No alert selected.</p>
          )}
        </div>
      </Card>
    </aside>
  );
}

function OverviewPage({ alerts }) {
  return (
    <div className="page-content stack gap-lg">
      <div className="grid kpi-grid">
        {kpiCards.map((card) => <StatCard key={card.title} {...card} />)}
      </div>

      <div className="grid two-wide-grid">
        <Card>
          <div className="card-inner chart-card">
            <SectionTitle icon={BarChart3} title="Inspection Trend" sub="Risk findings across recent inspection cycles" />
            <div className="chart-wrap">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={trendData}>
                  <CartesianGrid stroke="#1e293b" strokeDasharray="3 3" />
                  <XAxis dataKey="cycle" stroke="#94a3b8" />
                  <YAxis stroke="#94a3b8" />
                  <Tooltip
                  contentStyle={{
                  backgroundColor: "#0f172a",
                  border: "1px solid #334155",
                  borderRadius: "12px",
                  color: "#f8fafc",
                  fontSize: "14px",
                  }}
                  labelStyle={{
                    color: "#f8fafc",
                      fontWeight: 700,
                  }}
                  itemStyle={{
                    color: "#f8fafc",
                    fontWeight: 600,
                  }}
                  />
                  <Line type="monotone" dataKey="count" stroke="#abbdbd" strokeWidth={3} dot={{ r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </Card>

        <Card>
          <div className="card-inner chart-card">
            <SectionTitle icon={ShieldAlert} title="Risk Severity Distribution" sub="Current distribution of detected site risks" />
            <div className="chart-wrap">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={severityPieData} dataKey="value" nameKey="name" innerRadius={80} outerRadius={120} paddingAngle={4}>
                    <Cell fill="#ef4444" />
                    <Cell fill="#f97316" />
                    <Cell fill="#eab308" />
                    <Cell fill="#38bdf8" />
                  </Pie>
                  <Tooltip
                  contentStyle={{
                  backgroundColor: "#0f172a",
                  border: "1px solid #334155",
                  borderRadius: "12px",
                  color: "#f8fafc",
                  fontSize: "14px",
                  }}
                  labelStyle={{
                    color: "#f8fafc",
                      fontWeight: 700,
                  }}
                  itemStyle={{
                    color: "#f8fafc",
                    fontWeight: 600,
                  }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid two-wide-grid">
        <Card>
          <div className="card-inner chart-card">
            <SectionTitle icon={Map} title="Risk Count by Zone" sub="Spatial distribution of findings across site sectors" />
            <div className="chart-wrap">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={zoneRiskData}>
                  <CartesianGrid stroke="#1e293b" strokeDasharray="3 3" />
                  <XAxis dataKey="zone" stroke="#94a3b8" />
                  <YAxis stroke="#94a3b8" />
                  <Tooltip
                  contentStyle={{
                  backgroundColor: "#0f172a",
                  border: "1px solid #334155",
                  borderRadius: "12px",
                  color: "#f8fafc",
                  fontSize: "14px",
                  }}
                  labelStyle={{
                    color: "#f8fafc",
                      fontWeight: 700,
                  }}
                  itemStyle={{
                    color: "#f8fafc",
                    fontWeight: 600,
                  }}
                  />
                  <Bar dataKey="risks" radius={[8, 8, 0, 0]} fill="#cbd5e1" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </Card>

        <Card>
          <div className="card-inner">
            <SectionTitle icon={ShieldAlert} title="Recent Alerts" sub="Most recent high-priority alerts waiting for review" />
            <div className="stack gap-sm top-space">
              {alerts.map((alert) => (
                <div key={alert.id} className="recent-alert-row">
                  <img src={alert.thumb} alt={alert.title} className="thumb-sm" />
                  <div className="recent-alert-main">
                    <div className="recent-alert-top">
                      <span>{alert.title}</span>
                      <SeverityBadge severity={alert.severity} />
                    </div>
                    <div className="muted xs">{alert.zone} · {alert.time} · {alert.status}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

function MissionMonitorPage({ mission }) {
  const timeline = [
    "00:5 — No abnormalities were found.",
    "00:10 — No abnormalities were found.",
    "00:15 — No abnormalities were found.",
    "00:20 — No abnormalities were found.",
  ];

  return (
    <div className="page-content stack gap-lg">
      <div className="grid mission-grid">
        <Card>
          <div className="card-inner">
            <SectionTitle icon={MonitorPlay} title="Mission Playback" sub="Demo playback for the inspection task" />
            <video src={mission.video} controls className="hero-video" />
            <div className="tag-row top-space">
              <span className="tag red">Demo Playback</span>
              <span className="tag">Mission: {mission.id}</span>
              <span className="tag">Drone: {mission.droneId}</span>
            </div>
          </div>
        </Card>

        <Card>
          <div className="card-inner stack gap-md">
            <SectionTitle icon={Plane} title="Mission Telemetry" sub="Mission metadata and drone status" />
            <div className="grid info-grid">
              <InfoBlock label="Mission ID" value={mission.id} />
              <InfoBlock label="Drone ID" value={mission.droneId} />
              <InfoBlock label="Current Zone" value={mission.zone} />
              <InfoBlock label="Mode" value={mission.mode} />
              <InfoBlock label="Status" value={mission.status} />
              <InfoBlock label="Duration" value={mission.duration} />
            </div>

            <div>
              <div className="progress-label"><span>Battery</span><span>{mission.battery}%</span></div>
              <ProgressBar value={mission.battery} />
            </div>
            <div>
              <div className="progress-label"><span>Signal Strength</span><span>{mission.signal}%</span></div>
              <ProgressBar value={mission.signal} />
            </div>
            <div>
              <div className="progress-label"><span>Inspection Progress</span><span>{mission.progress}%</span></div>
              <ProgressBar value={mission.progress} />
            </div>
            <div>
              <div className="progress-label"><span>Route Coverage</span><span>{mission.routeCoverage}%</span></div>
              <ProgressBar value={mission.routeCoverage} />
            </div>

            <div className="note-box">
              <div className="muted xs upper">Latest Event</div>
              <div className="top-space-xs strong-white">{mission.lastEvent}</div>
            </div>
          </div>
        </Card>
      </div>

      <Card>
        <div className="card-inner">
          <SectionTitle icon={Clock3} title="Mission Event Timeline" sub="Key timestamps identified during the inspection run" />
          <div className="grid timeline-grid top-space">
            {timeline.map((item) => <div key={item} className="timeline-item">{item}</div>)}
          </div>
        </div>
      </Card>
    </div>
  );
}

function DetectionPage({ detections, selectedDetectionId, setSelectedDetectionId }) {
  const selectedDetection = detections.find((d) => d.id === selectedDetectionId) || detections[0];

  return (
    <div className="page-content stack gap-lg">
      <div className="grid mission-grid">
        <Card>
          <div className="card-inner">
            <SectionTitle icon={Radar} title="Annotated Detection View" sub="Image-based AI findings from latest inspection" />
            <img src={selectedDetection.image} alt={selectedDetection.category} className="hero-image" />
            <div className="grid mini-info-grid top-space">
              <InfoBlock label="Risk ID" value={selectedDetection.id} />
              <InfoBlock label="Zone" value={selectedDetection.zone} />
              <InfoBlock label="Time" value={selectedDetection.timestamp} />
              <InfoBlock label="Confidence" value={`${Math.round(selectedDetection.confidence * 100)}%`} />
            </div>
          </div>
        </Card>

        <Card>
          <div className="card-inner">
            <SectionTitle icon={AlertTriangle} title="Detection Results" sub="Select a finding to update the main image panel" />
            <div className="stack gap-sm top-space">
              {detections.map((detection) => (
                <button
                  key={detection.id}
                  className={`detection-item ${selectedDetection.id === detection.id ? "active" : ""}`}
                  onClick={() => setSelectedDetectionId(detection.id)}
                >
                  <div className="recent-alert-top">
                    <span>{detection.category}</span>
                    <SeverityBadge severity={detection.severity} />
                  </div>
                  <div className="muted xs top-space-xs">
                    {detection.id} · {detection.zone} · {detection.timestamp} · {Math.round(detection.confidence * 100)}% confidence
                  </div>
                  <div className="body-copy top-space-xs">{detection.description}</div>
                </button>
              ))}
            </div>
          </div>
        </Card>
      </div>

      <Card>
        <div className="card-inner">
          <SectionTitle icon={ClipboardList} title="Detection Table" sub="Structured view of AI-generated inspection findings" />
          <div className="table-wrap top-space">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Risk ID</th>
                  <th>Category</th>
                  <th>Zone</th>
                  <th>Time</th>
                  <th>Confidence</th>
                  <th>Severity</th>
                </tr>
              </thead>
              <tbody>
                {detections.map((item) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.category}</td>
                    <td>{item.zone}</td>
                    <td>{item.timestamp}</td>
                    <td>{Math.round(item.confidence * 100)}%</td>
                    <td><SeverityBadge severity={item.severity} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Card>
    </div>
  );
}

function ComparisonPage() {
  return (
    <div className="page-content stack gap-lg">
      <Card>
        <div className="card-inner">
          <SectionTitle icon={Video} title="Multi-Inspection Comparison" sub="Temporal comparison of the same location across repeated inspection cycles" />
          <div className="grid comparison-grid top-space">
            {comparisonData.images.map((image) => (
              <div key={image.label} className="comparison-card">
                <div className="comparison-label">{image.label}</div>
                <img src={image.src} alt={image.label} className="comparison-image" />
              </div>
            ))}
          </div>
        </div>
      </Card>

      <div className="grid summary-grid">
        <InfoBlock label="Observed Issue" value={comparisonData.title} />
        <InfoBlock label="Repeat Count" value={`${comparisonData.repeatCount} consecutive inspections`} />
        <InfoBlock label="Severity Trend" value={comparisonData.severityTrend} />
        <InfoBlock label="Corrective Action Observed" value={comparisonData.correctiveActionObserved} />
      </div>

      <div className="grid two-wide-grid">
        <Card>
          <div className="card-inner note-box">
            <div className="muted xs upper">Observation Window</div>
            <p className="body-copy top-space">
              First observed: {comparisonData.firstObserved}<br />
              Last observed: {comparisonData.lastObserved}<br />
              Zone: {comparisonData.zone}
            </p>
          </div>
        </Card>
        <Card>
          <div className="card-inner note-box">
            <div className="muted xs upper">Recommended Response</div>
            <p className="body-copy top-space">{comparisonData.recommendation}</p>
          </div>
        </Card>
      </div>
    </div>
  );
}

function RiskMapPage() {
  const [selectedPointId, setSelectedPointId] = useState(siteRiskPoints[1].id);
  const selectedPoint = siteRiskPoints.find((point) => point.id === selectedPointId) || siteRiskPoints[0];

  return (
    <div className="page-content stack gap-lg">
      <div className="grid mission-grid">
        <Card>
          <div className="card-inner">
            <SectionTitle icon={Map} title="Site Risk Map" sub="Spatial view of risk distribution across the construction site" />
            <div className="map-wrapper top-space">
              <img src={ASSETS.siteMap} alt="Site map" className="map-image" />
              {siteRiskPoints.map((point) => (
                <button
                  key={point.id}
                  className={`map-point ${point.severity.toLowerCase()} ${selectedPointId === point.id ? "selected" : ""}`}
                  style={{ top: point.top, left: point.left }}
                  onClick={() => setSelectedPointId(point.id)}
                  title={`${point.name} - ${point.type}`}
                />
              ))}
            </div>
          </div>
        </Card>

        <Card>
          <div className="card-inner stack gap-md">
            <SectionTitle icon={ShieldAlert} title="Selected Risk Point" sub="Details for the currently selected site marker" />
            <InfoBlock label="Zone" value={selectedPoint.name} />
            <InfoBlock label="Risk Type" value={selectedPoint.type} />
            <div className="info-block"><div className="muted xs">Severity</div><div className="top-space-xs"><SeverityBadge severity={selectedPoint.severity} /></div></div>
            <InfoBlock label="Status" value={selectedPoint.status} />
            <InfoBlock label="First Detected" value={selectedPoint.firstDetected} />
            <InfoBlock label="Last Detected" value={selectedPoint.lastDetected} />
            <InfoBlock label="Repeat Count" value={String(selectedPoint.repeat)} />
          </div>
        </Card>
      </div>
    </div>
  );
}

function AlertsPage({ alerts, selectedAlert, setSelectedAlert }) {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const filteredAlerts = useMemo(() => {
    return alerts.filter((alert) => {
      const matchesSearch = [alert.title, alert.zone, alert.status, alert.severity]
        .join(" ")
        .toLowerCase()
        .includes(search.toLowerCase());
      const matchesFilter = filter === "All" ? true : alert.severity === filter;
      return matchesSearch && matchesFilter;
    });
  }, [alerts, search, filter]);

  return (
    <div className="page-content stack gap-lg">
      <Card>
        <div className="card-inner">
          <SectionTitle icon={ShieldAlert} title="Alert Center" sub="AI-generated incidents requiring attention or review" />
          <div className="toolbar top-space">
            <input
              className="input"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search alerts by title, zone, status..."
            />
            <select className="select" value={filter} onChange={(e) => setFilter(e.target.value)}>
              <option value="All">All Severities</option>
              <option value="Critical">Critical</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>

          <div className="grid alert-grid top-space">
            {filteredAlerts.map((alert) => (
              <button
                key={alert.id}
                className={`alert-card ${selectedAlert?.id === alert.id ? "active" : ""}`}
                onClick={() => setSelectedAlert(alert)}
              >
                <img src={alert.thumb} alt={alert.title} className="alert-thumb" />
                <div className="alert-main">
                  <div className="recent-alert-top">
                    <span>{alert.title}</span>
                    <SeverityBadge severity={alert.severity} />
                  </div>
                  <div className="muted xs top-space-xs">{alert.id} · {alert.zone} · {alert.time}</div>
                  <div className="body-copy top-space-xs">{alert.reason}</div>
                  <div className="muted xs top-space-xs">Status: {alert.status}</div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
}

function ReviewPage({ selectedAlert, onUpdateStatus }) {
  const [decision, setDecision] = useState("Confirm Risk");
  const [assignee, setAssignee] = useState("Site Safety Manager");
  const [note, setNote] = useState(
    "AI recommendation reviewed. Awaiting manual verification and follow-up assignment."
  );

  return (
    <div className="page-content stack gap-lg">
      <div className="grid two-wide-grid">
        <Card>
          <div className="card-inner stack gap-md">
            <SectionTitle icon={UserCheck} title="Incident Under Review" sub="Selected AI-generated incident for engineer validation" />
            {selectedAlert ? (
              <>
                <img src={selectedAlert.thumb} alt={selectedAlert.title} className="hero-image medium" />
                <div className="grid info-grid">
                  <InfoBlock label="Alert ID" value={selectedAlert.id} />
                  <InfoBlock label="Zone" value={selectedAlert.zone} />
                  <InfoBlock label="Current Status" value={selectedAlert.status} />
                  <div className="info-block"><div className="muted xs">Severity</div><div className="top-space-xs"><SeverityBadge severity={selectedAlert.severity} /></div></div>
                </div>
                <div className="note-box">
                  <div className="muted xs upper">AI Recommendation</div>
                  <p className="body-copy top-space">{selectedAlert.suggestedAction}</p>
                </div>
                <div className="note-box">
                  <div className="muted xs upper">Reason</div>
                  <p className="body-copy top-space">{selectedAlert.reason}</p>
                </div>
              </>
            ) : (
              <p className="muted small">Select an alert first.</p>
            )}
          </div>
        </Card>

        <Card>
          <div className="card-inner stack gap-md">
            <SectionTitle icon={ClipboardList} title="Engineer Decision Panel" sub="Human-in-the-loop validation and follow-up assignment" />
            <div>
              <label className="label">Decision</label>
              <select className="select full" value={decision} onChange={(e) => setDecision(e.target.value)}>
                <option value="Confirm Risk">Confirm Risk</option>
                <option value="False Positive">False Positive</option>
                <option value="Needs Recheck">Needs Recheck</option>
                <option value="Escalate">Escalate</option>
                <option value="Close Case">Close Case</option>
              </select>
            </div>
            <div>
              <label className="label">Assign To</label>
              <input className="input full" value={assignee} onChange={(e) => setAssignee(e.target.value)} />
            </div>
            <div>
              <label className="label">Review Note</label>
              <textarea className="textarea full" value={note} onChange={(e) => setNote(e.target.value)} />
            </div>
            <div className="button-row">
              <button className="primary-btn" onClick={() => onUpdateStatus(selectedAlert?.id, decision)} disabled={!selectedAlert}>
                Confirm and Update
              </button>
              <button className="secondary-btn" onClick={() => onUpdateStatus(selectedAlert?.id, "Request Follow-up Inspection")} disabled={!selectedAlert}>
                Request Re-Inspection
              </button>
            </div>
            <div className="note-box">
              Final responsibility remains with the engineer. AI findings are advisory and intended to support site-level decision-making.
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

function ReportsPage() {
  return (
    <div className="page-content stack gap-lg">
      <div className="grid two-wide-grid report-grid">
        <Card>
          <div className="card-inner stack gap-md">
            <SectionTitle icon={ClipboardList} title="Inspection Report Summary" sub="Auto-structured summary for management review" />
            <InfoBlock label="Report ID" value="REP-2026-0315-01" />
            <InfoBlock label="Inspection Date" value="2026-03-15" />
            <InfoBlock label="Inspected Zones" value="Zone A, Zone B, Zone D" />
            <InfoBlock label="Total Findings" value="18" />
            <InfoBlock label="High-Risk Findings" value="4" />
            <InfoBlock label="Repeated Issues" value="2" />
            <InfoBlock label="Engineer-Reviewed Cases" value="5" />
            <div className="note-box">
              <div className="muted xs upper">Key Recommendation</div>
              <p className="body-copy top-space">Prioritize Zone B route clearance and Zone D edge protection rectification. Schedule follow-up drone verification after corrective action.</p>
            </div>
            <div className="button-row">
              <button className="primary-btn">Export PDF</button>
              <button className="secondary-btn">Share Report</button>
            </div>
          </div>
        </Card>

        <Card>
          <div className="card-inner">
            <SectionTitle icon={BarChart3} title="Report Preview" sub="Preview of the generated inspection report" />
            <img src={ASSETS.reportPreview} alt="Report preview" className="report-preview top-space" />
          </div>
        </Card>
      </div>
    </div>
  );
}

export default function App() {
  const [activePage, setActivePage] = useState("overview");
  const [selectedMissionId, setSelectedMissionId] = useState(missions[0].id);
  const [selectedDetectionId, setSelectedDetectionId] = useState(detections[0].id);
  const [alerts, setAlerts] = useState(initialAlerts);
  const [selectedAlert, setSelectedAlert] = useState(initialAlerts[0]);

  const selectedMission = missions.find((mission) => mission.id === selectedMissionId) || missions[0];

  function handleUpdateAlertStatus(alertId, nextStatus) {
    if (!alertId) return;
    const updatedAlerts = alerts.map((alert) =>
      alert.id === alertId ? { ...alert, status: nextStatus } : alert
    );
    setAlerts(updatedAlerts);
    const latestSelected = updatedAlerts.find((alert) => alert.id === alertId);
    if (latestSelected) setSelectedAlert(latestSelected);
  }

  function renderPage() {
    switch (activePage) {
      case "overview":
        return <OverviewPage alerts={alerts} />;
      case "missions":
        return <MissionMonitorPage mission={selectedMission} />;
      case "detections":
        return (
          <DetectionPage
            detections={detections}
            selectedDetectionId={selectedDetectionId}
            setSelectedDetectionId={setSelectedDetectionId}
          />
        );
      case "comparisons":
        return <ComparisonPage />;
      case "riskmap":
        return <RiskMapPage />;
      case "alerts":
        return <AlertsPage alerts={alerts} selectedAlert={selectedAlert} setSelectedAlert={setSelectedAlert} />;
      case "review":
        return <ReviewPage selectedAlert={selectedAlert} onUpdateStatus={handleUpdateAlertStatus} />;
      case "reports":
        return <ReportsPage />;
      default:
        return <OverviewPage alerts={alerts} />;
    }
  }

  return (
    <div className="app-shell">
      <Sidebar activePage={activePage} setActivePage={setActivePage} />
      <div className="main-column">
        <TopBar selectedMissionId={selectedMissionId} setSelectedMissionId={setSelectedMissionId} />
        <main className="main-area">{renderPage()}</main>
      </div>
      <RightRail
        alerts={alerts}
        selectedAlert={selectedAlert}
        setSelectedAlert={setSelectedAlert}
        selectedMission={selectedMission}
      />
    </div>
  );
}
