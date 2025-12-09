import { useState, useEffect } from 'react'

function Settings() {
  const [data, setData] = useState({
    theme: "light",
    lang: "en",
    size: 14
  })

  useEffect(() => {
    const x = localStorage.getItem("settings")
    if (x) {
      setData(JSON.parse(x))
    }
  }, [])

  const handleChange = (e) => {
    const temp = {...data}
    temp[e.target.name] = e.target.value
    setData(temp)
    localStorage.setItem("settings", JSON.stringify(temp))
  }

  return (
    <div style={{padding: "20px", background: "#fff", borderRadius: "8px"}}>
      <h1 style={{fontSize: "24px", marginBottom: "20px", color: "#333"}}>User Settings</h1>

      <div style={{marginBottom: "15px"}}>
        <label style={{display: "block", marginBottom: "5px", color: "#555"}}>Theme</label>
        <select name="theme" value={data.theme} onChange={handleChange} style={{width: "100%", padding: "8px", border: "1px solid #ccc", borderRadius: "4px"}}>
          <option value="light">Light</option>
          <option value="dark">Dark</option>
          <option value="auto">Auto</option>
        </select>
      </div>

      <div style={{marginBottom: "15px"}}>
        <label style={{display: "block", marginBottom: "5px", color: "#555"}}>Language</label>
        <select name="lang" value={data.lang} onChange={handleChange} style={{width: "100%", padding: "8px", border: "1px solid #ccc", borderRadius: "4px"}}>
          <option value="en">English</option>
          <option value="es">Spanish</option>
          <option value="fr">French</option>
        </select>
      </div>

      <div style={{marginBottom: "15px"}}>
        <label style={{display: "block", marginBottom: "5px", color: "#555"}}>Font Size</label>
        <input type="number" name="size" value={data.size} onChange={handleChange} style={{width: "100%", padding: "8px", border: "1px solid #ccc", borderRadius: "4px"}} />
      </div>

      <button onClick={() => {
        localStorage.removeItem("settings")
        setData({theme: "light", lang: "en", size: 14})
      }} style={{padding: "10px 20px", background: "#dc2626", color: "white", border: "none", borderRadius: "4px", cursor: "pointer"}}>
        Reset to Defaults
      </button>
    </div>
  )
}

export default Settings