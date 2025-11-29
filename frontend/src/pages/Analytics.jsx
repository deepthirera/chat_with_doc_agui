import { useState, useEffect } from 'react'

function Analytics() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchData()
    const interval = setInterval(fetchData, 5000)
    return () => clearInterval(interval)
  }, [])

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/analytics/stats")
      const result = await response.json()
      setData(result)
      setLoading(false)
    } catch (e) {
      console.log("Error:", e)
      setLoading(false)
    }
  }

  if (loading) return <div style={{padding: "20px"}}>Loading...</div>

  if (!data) return <div style={{padding: "20px"}}>No data</div>

  return (
    <div style={{padding: "20px"}}>
      <h1 style={{fontSize: "28px", marginBottom: "20px", color: "#111"}}>Analytics Dashboard</h1>

      <div style={{display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px", marginBottom: "30px"}}>
        <div style={{background: "#3b82f6", color: "white", padding: "20px", borderRadius: "8px"}}>
          <div style={{fontSize: "14px", opacity: 0.9}}>Total Views</div>
          <div style={{fontSize: "32px", fontWeight: "bold", marginTop: "10px"}}>{data.total_views}</div>
        </div>
        <div style={{background: "#10b981", color: "white", padding: "20px", borderRadius: "8px"}}>
          <div style={{fontSize: "14px", opacity: 0.9}}>Total Searches</div>
          <div style={{fontSize: "32px", fontWeight: "bold", marginTop: "10px"}}>{data.total_searches}</div>
        </div>
        <div style={{background: "#f59e0b", color: "white", padding: "20px", borderRadius: "8px"}}>
          <div style={{fontSize: "14px", opacity: 0.9}}>Total Chats</div>
          <div style={{fontSize: "32px", fontWeight: "bold", marginTop: "10px"}}>{data.total_chats}</div>
        </div>
      </div>

      <div style={{display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px"}}>
        <div style={{background: "white", padding: "20px", borderRadius: "8px", border: "1px solid #e5e7eb"}}>
          <h2 style={{fontSize: "18px", marginBottom: "15px", color: "#333"}}>Popular Documents</h2>
          {data.popular_docs && data.popular_docs.length > 0 ? (
            <ul style={{listStyle: "none", padding: 0}}>
              {data.popular_docs.map((item, i) => (
                <li key={i} style={{marginBottom: "10px", padding: "10px", background: "#f9fafb", borderRadius: "4px"}}>
                  <div style={{display: "flex", justifyContent: "space-between"}}>
                    <span>{item[0]}</span>
                    <span style={{fontWeight: "bold", color: "#3b82f6"}}>{item[1]} views</span>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p style={{color: "#999"}}>No data yet</p>
          )}
        </div>

        <div style={{background: "white", padding: "20px", borderRadius: "8px", border: "1px solid #e5e7eb"}}>
          <h2 style={{fontSize: "18px", marginBottom: "15px", color: "#333"}}>Recent Searches</h2>
          {data.recent_searches && data.recent_searches.length > 0 ? (
            <ul style={{listStyle: "none", padding: 0}}>
              {data.recent_searches.map((query, i) => (
                <li key={i} style={{marginBottom: "8px", padding: "8px", background: "#f9fafb", borderRadius: "4px"}}>
                  {query || "(empty)"}
                </li>
              ))}
            </ul>
          ) : (
            <p style={{color: "#999"}}>No searches yet</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default Analytics