import { useContext } from "react"
import { CollectionContextType, ICollection } from "../../provider/type"
import { CollectionContext } from "../../provider/context"
import styled from '@emotion/styled';
import { IoMdCloseCircle } from "react-icons/io"

const MultiAutocompleteWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  gap: 10px
`

const SelectedChip = styled.div`
  display: flex;
  align-items: center;
  padding: 5px;
  font-size: 12px;
  background: ${(props) => props.theme.colors.accent};
  border-radius: 10px;
`

const SelectInput = styled.select`
  width: 100%;
  padding: .5rem;
`

interface MultiAutocompleteProps {
  existingCollection: ICollection[];
  collectionsWithAnime: ICollection[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handleAddToExisting: (arg?: any) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handleRemove: (arg?: any) => void;
}

const MultiAutocomplete = (props: MultiAutocompleteProps) => {
  const { existingCollection, handleAddToExisting, handleRemove, collectionsWithAnime } = props
  const { collection } = useContext(CollectionContext) as CollectionContextType

  const filteredOptions = collection.filter((item) =>
    !existingCollection.some((data: ICollection) => data.collection_name === item.collection_name) &&
    collectionsWithAnime.every((data: ICollection) => data.id !== item.id)
  );

  return (
    <MultiAutocompleteWrapper>
      {existingCollection.map((item: ICollection, index: number) => <SelectedChip key={index} onClick={() => handleRemove(item.collection_name)}>{item.collection_name} <IoMdCloseCircle /></SelectedChip>)}
      <SelectInput name="select_data" id="select_data" value="default" defaultValue="default" onChange={handleAddToExisting}>
        <option value="default" disabled>Select an option</option>
        {filteredOptions.map((item) => {
          return <option key={item.id} value={item.collection_name}>{item.collection_name}</option>
        })}
      </SelectInput>
    </MultiAutocompleteWrapper>
  )
}

export default MultiAutocomplete