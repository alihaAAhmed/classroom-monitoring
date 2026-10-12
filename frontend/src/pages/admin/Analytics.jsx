import { useState } from "react";
import {
  BarChart3, TrendingUp, Users, School, Camera, Clock,
  CheckCircle2, AlertCircle, Activity, Award, Target,
  PieChart, Download, Zap,
} from "lucide-react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import LogoutModal from "../../components/LogoutModal";
import { useAuth } from "../../context/AuthContext";
import { rooms } from "../../data/rooms";
import { getRequests } from "../../data/requests";

export default function Analytics() {
  const [logoutOpen, setLogoutOpen] = useState(false);
  const [range, setRange] = useState("7d");
  const { logout } = useAuth();

  const requests = getRequests();

  const totalRooms = rooms.length;
  const onlineCameras = rooms.filter((r) => r.cameraOnline).length;
  const offlineCameras = totalRooms - onlineCameras;
  const totalCapacity = rooms.reduce((s, r) => s + r.capacity, 0);
  const totalOccupancy = rooms.reduce((s, r) => s + r.occupancy, 0);
  const avgOccupancy = Math.round((totalOccupancy / totalCapacity) * 100);
  const approvedRequests = requests.filter((r) => r.status === "approved").length;
  const pendingRequests = requests.filter((r) => r.status === "pending").length;
  const cameraUptime = ((onlineCameras / totalRooms) * 100).toFixed(1);

  const stats = [
    { icon: School, value: totalRooms, label: "Total Classrooms", sub: `${totalCapacity} total seats`, color: "blue", trend: "+2 this month" },
    { icon: TrendingUp, value: `${avgOccupancy}%`, label: "Avg. Occupancy", sub: "Across all rooms", color: "green", trend: "+5% vs last week" },
    { icon: Users, value: totalOccupancy, label: "Active People", sub: `Peak: 82%`, color: "orange", trend: "Live right now" },
    { icon: CheckCircle2, value: approvedRequests, label: "Approved Requests", sub: `${pendingRequests} pending`, color: "purple", trend: "+8 this week" },
  ];

  const roomUsage = rooms
    .map((r) => ({ ...r, pct: Math.round((r.occupancy / r.capacity) * 100) }))
    .sort((a, b) => b.pct - a.pct)
    .slice(0, 6);

  const buildingCounts = rooms.reduce((acc, r) => {
    acc[r.building] = (acc[r.building] || 0) + 1;
    return acc;
  }, {});

  const typeCounts = rooms.reduce((acc, r) => {
    acc[r.type] = (acc[r.type] || 0) + 1;
    return acc;
  }, {});

  const statusCounts = rooms.reduce((acc, r) => {
    acc[r.status] = (acc[r.status] || 0) + 1;
    return acc;
  }, {});

  const peakHours = [
    { hour: "8AM", value: 22 },
    { hour: "10AM", value: 78 },
    { hour: "12PM", value: 45 },
    { hour: "2PM", value: 92 },
    { hour: "4PM", value: 68 },
    { hour: "6PM", value: 32 },
  ];

  const topRoom = roomUsage[0];

  return (
    <>
      <Navbar
        onLogout={() => setLogoutOpen(true)}
        links={[
          { to: "/admin/dashboard", label: "Dashboard" },
          { to: "/admin/classrooms", label: "Classrooms" },
          { to: "/admin/cameras", label: "Camera Monitoring" },
          { to: "/admin/requests", label: "Classroom Requests" },
          { to: "/admin/users", label: "User Management" },
          { to: "/admin/analytics", label: "Analytics" },
        ]}
      />

      <div className="page-header page-header-flex">
        <div>
          <h1>Analytics & Reports</h1>
          <p>Comprehensive insights into classroom usage and system performance.</p>
        </div>

        <div className="analytics-actions">
          <div className="range-tabs">
            {["24h", "7d", "30d", "90d"].map((r) => (
              <button
                key={r}
                onClick={() => setRange(r)}
                className={`range-tab ${range === r ? "active" : ""}`}
              >
                {r}
              </button>
            ))}
          </div>

          <button className="page-header-btn" onClick={() => window.print()}>
            <Download size={16} />
            Export
          </button>
        </div>
      </div>

      <div className="container admin-container">
        <div className="stats-grid">
          {stats.map((s, i) => (
            <div key={i} className="stat-card">
              <div className={`stat-icon ${s.color}`}>
                <s.icon size={24} />
              </div>
              <div style={{ flex: 1 }}>
                <div className="stat-val">{s.value}</div>
                <div className="stat-lbl">{s.label}</div>
                <div className="stat-trend">↑ {s.trend}</div>
              </div>
            </div>
          ))}
        </div>

        {/* HIGHLIGHTS */}
        <div className="highlights-grid">
          <div className="highlight-card amber">
            <div className="highlight-icon">
              <Award size={26} />
            </div>
            <div>
              <div className="highlight-lbl">Most Used Room</div>
              <div className="highlight-val">{topRoom?.name || "—"}</div>
              <div className="highlight-sub">{topRoom?.pct || 0}% occupancy</div>
            </div>
          </div>

          <div className="highlight-card green">
            <div className="highlight-icon">
              <Zap size={26} />
            </div>
            <div>
              <div className="highlight-lbl">Camera Uptime</div>
              <div className="highlight-val lg">{cameraUptime}%</div>
              <div className="highlight-sub">
                {onlineCameras} of {totalRooms} online
              </div>
            </div>
          </div>

          <div className="highlight-card blue">
            <div className="highlight-icon">
              <Target size={26} />
            </div>
            <div>
              <div className="highlight-lbl">System Efficiency</div>
              <div className="highlight-val lg">
                {Math.round((approvedRequests / (requests.length || 1)) * 100)}%
              </div>
              <div className="highlight-sub">Request approval rate</div>
            </div>
          </div>
        </div>

        {/* ROW 1 */}
        <div className="bottom-grid">
          <div className="analytics-card">
            <div className="analytics-card-header">
              <h3>
                <BarChart3 size={17} color="#4F6DDF" />
                Room Usage
              </h3>
              <span className="badge-tag blue">TOP 6</span>
            </div>

            {roomUsage.map((r) => (
              <div key={r.id} className="usage-row">
                <div className="usage-head">
                  <span>
                    {r.name}{" "}
                    <span className="usage-type">{r.type}</span>
                  </span>
                  <span
                    className={
                      r.pct >= 70 ? "usage-pct red" : r.pct >= 40 ? "usage-pct orange" : "usage-pct green"
                    }
                  >
                    {r.pct}%
                  </span>
                </div>
                <div className="usage-bar">
                  <div
                    className={`usage-fill ${
                      r.pct >= 70 ? "red" : r.pct >= 40 ? "orange" : "green"
                    }`}
                    style={{ width: `${r.pct}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="analytics-card">
            <div className="analytics-card-header">
              <h3>
                <Clock size={17} color="#4F6DDF" />
                Peak Usage Hours
              </h3>
              <span className="badge-tag orange">TODAY</span>
            </div>

            <div className="peak-bars">
              {peakHours.map((h, i) => (
                <div key={i} className="peak-bar-item">
                  <div className="peak-val">{h.value}%</div>
                  <div
                    className={`peak-bar ${
                      h.value >= 70 ? "high" : h.value >= 40 ? "mid" : "low"
                    }`}
                    style={{ height: `${h.value * 1.5}px` }}
                  />
                  <div className="peak-hour">{h.hour}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ROW 2 */}
        <div className="analytics-3col">
          <div className="analytics-card small">
            <h3 className="analytics-card-title">
              <School size={17} color="#4F6DDF" />
              Buildings
            </h3>
            {Object.entries(buildingCounts).map(([name, count], i) => (
              <div key={name} className="list-row">
                <span>{name}</span>
                <strong className="text-blue">{count} rooms</strong>
              </div>
            ))}
          </div>

          <div className="analytics-card small">
            <h3 className="analytics-card-title">
              <PieChart size={17} color="#4F6DDF" />
              Room Types
            </h3>
            {Object.entries(typeCounts).map(([name, count]) => (
              <div key={name} className="list-row">
                <span>{name}</span>
                <strong className="text-purple">{count}</strong>
              </div>
            ))}
          </div>

          <div className="analytics-card small">
            <h3 className="analytics-card-title">
              <Activity size={17} color="#4F6DDF" />
              Status
            </h3>
            {Object.entries(statusCounts).map(([name, count]) => (
              <div key={name} className="list-row">
                <div className="list-left">
                  <span
                    className={`dot ${
                      name === "available"
                        ? "green"
                        : name === "occupied"
                        ? "red"
                        : name === "inuse"
                        ? "orange"
                        : "gray"
                    }`}
                  />
                  <span className="capitalize">{name}</span>
                </div>
                <strong>{count}</strong>
              </div>
            ))}
          </div>
        </div>

        {/* CAMERA PERFORMANCE */}
        <div className="analytics-card">
          <h3 className="analytics-card-title-lg">
            <Camera size={17} color="#4F6DDF" />
            Camera Performance
          </h3>

          <div className="camera-perf-grid">
            <div className="perf-box">
              <div className="perf-val blue">{totalRooms}</div>
              <div className="perf-lbl">Total Cameras</div>
            </div>
            <div className="perf-box green-light">
              <div className="perf-val green">{onlineCameras}</div>
              <div className="perf-lbl green">Online</div>
            </div>
            <div className="perf-box red-light">
              <div className="perf-val red">{offlineCameras}</div>
              <div className="perf-lbl red">Offline</div>
            </div>
            <div className="perf-box blue-light">
              <div className="perf-val blue-dark">{cameraUptime}%</div>
              <div className="perf-lbl blue-dark">Uptime</div>
            </div>
          </div>

          <div className="health-bar-wrap">
            <div className="health-bar-head">
              <span>System Health</span>
              <span className="text-green">{cameraUptime}%</span>
            </div>
            <div className="health-bar">
              <div className="health-fill" style={{ width: `${cameraUptime}%` }} />
            </div>
          </div>
        </div>

        {/* INSIGHTS */}
        <div className="analytics-card">
          <h3 className="analytics-card-title-lg">
            <Zap size={17} color="#4F6DDF" />
            Key Insights & Recommendations
          </h3>

          <div className="insights-grid">
            {[
              {
                icon: TrendingUp,
                title: `${topRoom?.name} is most utilized`,
                desc: `${topRoom?.pct}% average occupancy — consider scheduling overflow classes in adjacent rooms.`,
                color: "#D97706",
                bg: "#FEF3C7",
              },
              {
                icon: AlertCircle,
                title: `${offlineCameras} camera${offlineCameras !== 1 ? "s" : ""} need attention`,
                desc: `Maintenance recommended to maintain ${cameraUptime}% uptime.`,
                color: "#DC2626",
                bg: "#FEE2E2",
              },
              {
                icon: Clock,
                title: "Peak hours: 2PM – 4PM",
                desc: "Classrooms see 90%+ occupancy during afternoon slots.",
                color: "#4F6DDF",
                bg: "#EFF6FF",
              },
              {
                icon: CheckCircle2,
                title: `${approvedRequests} requests approved`,
                desc: `${pendingRequests} pending — approval rate at ${Math.round((approvedRequests / (requests.length || 1)) * 100)}%.`,
                color: "#16A34A",
                bg: "#DCFCE7",
              },
            ].map((insight, i) => (
              <div key={i} className="insight-item">
                <div className="insight-icon" style={{ background: insight.bg, color: insight.color }}>
                  <insight.icon size={20} />
                </div>
                <div>
                  <div className="insight-title">{insight.title}</div>
                  <div className="insight-desc">{insight.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />

      <LogoutModal
        open={logoutOpen}
        onClose={() => setLogoutOpen(false)}
        onConfirm={() => {
          logout();
          window.location.href = "/login";
        }}
        panel="Admin Panel"
      />
    </>
  );
}