import React, { useContext, useState } from "react"
import { CollectionContextType } from "../../provider/type"
import { CollectionContext } from "../../provider/context"
import styled from '@emotion/styled';
import { IoMdCloseCircle } from "react-icons/io"

const SelectedChip = styled.div`
  display: flex;
  align-items: center;
  padding: 5px;
  font-size: 8px;
  background: ${(props) => props.theme.colors.accent};
  border-radius: 10px;
`

const MultiAutocomplete = () => {
  const { collection } = useContext(CollectionContext) as CollectionContextType
  const [selectedValue, setSelectedValue] = useState<string[]>([])
  console.log("🚀 ~ file: index.tsx:9 ~ MultiAutocomplete ~ selectedValue:", selectedValue)

  const handleSelect = (e: React.FormEvent<HTMLSelectElement>) => setSelectedValue([...selectedValue, e.currentTarget.value])
  return (
    <div style={{ display: "flex", flexWrap: "wrap", width: "100%" }}>
      {selectedValue.map((item) => <SelectedChip>{item} <IoMdCloseCircle /></SelectedChip>)}
      <select name="select_data" id="select_data" onChange={handleSelect}>
        {collection.map((item) => {
          return <option value={item.collection_name}>{item.collection_name}</option>
        })}
      </select>
    </div>
  )
}

export default MultiAutocomplete