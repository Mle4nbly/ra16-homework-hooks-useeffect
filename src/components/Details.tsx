import { useEffect, useState } from "react"

export type UserInfoType = {
  id: number,
  name: string,
  avatar: string,
  details: {
      city: string,
      company: string,
      position: string
  }
}

export const Details = ({id}: {id: number}) => {
  const [isLoading, setIsLoading] = useState(false)
  const [userInfo, setUserInfo] = useState<UserInfoType | null>(null)

  useEffect(() => {
    if (!id) return;

    setIsLoading(true);
    console.log(id)
    const fetchData = async () => {
      try {
        const response = await fetch(`https://raw.githubusercontent.com/netology-code/ra16-homeworks/master/hooks-context/use-effect/data/${id}.json`)
        if (!response.ok) throw new Error('Responce is not ok');
        const data = await response.json()
        setUserInfo(data)
      } catch (error) {
        console.log(error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData();
  }, [id])
  
  console.log(userInfo)

  if (isLoading) return (<div>Загрузка...</div>)
  if (!userInfo) return;

  return (
    <div className="user-info">
      <div className="avatar">
        <img src={userInfo.avatar} alt="" />
      </div>
      <h2 className="name">{userInfo.name}</h2>
      <p className="city">City: {userInfo.details.city}</p>
      <p className="company">Company: {userInfo.details.company}</p>
      <p className="position">Position: {userInfo.details.position}</p>
    </div>
  )
}