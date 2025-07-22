import { useEffect, useState, useRef } from "react"
import type { UserType } from "../App";

interface ListProps {
  onSelect: (user: UserType) => void;
}

export const List = ({ onSelect }: ListProps) => {
  const [list, setList] = useState<UserType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const itemsRef = useRef<{[key: number]: HTMLLIElement | null}>({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://raw.githubusercontent.com/netology-code/ra16-homeworks/master/hooks-context/use-effect/data/users.json')
        if (!response.ok) throw new Error('Responce is not ok');
        const data = await response.json();
        setList(data)
      } catch (error) {
        console.log(error)
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, []);
  
  if (isLoading) return (<div>Загрузка...</div>)

  return (
    <ul className="user-list">
      {list.map((item: UserType) => (
        <li 
          className="user" 
          key={item.id}
          ref={el => { itemsRef.current[item.id] = el; }}
          tabIndex={0}
          onClick={() => {onSelect(item)}}
        >
          {item.name}
        </li>
      ))}
    </ul>
  )
}