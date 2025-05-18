import { createContext, useContext, useState, useEffect } from "react"

interface UserContextType {
  user: any | null
  loading: boolean
}

const UserContext = createContext<UserContextType>({ user: null, loading: true })

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Fetch user data from API or local storage here
    // ... your logic to fetch user data ...
    const fetchUserData = async () => {
      try {
        // Replace with your actual user data fetching logic
        const userData = await Promise.resolve(null) // Replace with your API call
        setUser(userData)
      } catch (error) {
        console.error("Error fetching user data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchUserData()
  }, [])

  return <UserContext.Provider value={{ user, loading }}>{children}</UserContext.Provider>
}

export const useUser = () => {
  const context = useContext(UserContext)
  if (context === null) {
    throw new Error("useUser must be used within a UserProvider")
  }
  return context
}

