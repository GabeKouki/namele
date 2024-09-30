import { useState } from "react"

const GenerateName = () => {
  const [targetName, setTargetName] = useState(getRandomName())

  const getRandomName = () => {
    let newName

    do {
      newName = getRandomName()
    } while (newName === targetName.current)

    setTargetName(newName)
  }

  return targetName;
}
