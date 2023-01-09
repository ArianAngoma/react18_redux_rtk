import { FC, useMemo } from 'react'
import { 
  Grid, 
  ListItem,
  ListItemButton, 
  ListItemIcon,
  ListItemText 
} from '@mui/material'
import { TurnedInNot } from '@mui/icons-material'

import { Note, setActiveNote } from '../../store';
import { useAppDispatch } from '../../hooks';

type SideBarItemProp = Note

const SideBarItem: FC<SideBarItemProp> = ({ 
  id, 
  title, 
  body, 
  imagesURLs, 
  date 
}: SideBarItemProp) => {

  const newTitle = useMemo(() => {
    return title.length > 17
      ? title.substring(0, 17) + '...'
      : title
  }, [title])

  const dispatch = useAppDispatch()

  const onActiveNote = () => dispatch(setActiveNote({ 
    id, 
    title, 
    body, 
    imagesURLs, 
    date
  }))

  return (
    <ListItem disablePadding>

      <ListItemButton onClick={onActiveNote}>

        <ListItemIcon>
          <TurnedInNot />
        </ListItemIcon>

        <Grid container>
          <ListItemText primary={newTitle} />

          <ListItemText
            secondary={body}
          />
        </Grid>

      </ListItemButton>

    </ListItem>
  )

}

export default SideBarItem
