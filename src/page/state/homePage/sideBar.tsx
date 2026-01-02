import { Box, List, ListItemButton, ListItemText } from '@mui/material'

const SideBar = () => {
  return (
    <Box
      sx={{
        width: 240,
        bgcolor: '#020617',
        color: 'white',
        minHeight: '100vh',
        p: 2
      }}
    >
      <List>
        {['Dashboard', 'Orders', 'Products', 'Other'].map(item => (
          <ListItemButton key={item}>
            <ListItemText primary={item} />
          </ListItemButton>
        ))}
      </List>
    </Box>
  )
}

export default SideBar
