import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  InputBase,
  Box,
  Badge,
  Avatar
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import NotificationsIcon from '@mui/icons-material/Notifications'

const Topbar = () => {
  return (
    <AppBar position="static" sx={{ bgcolor: '#0f172a' }}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        
        <Typography variant="h6" sx={{ fontWeight: 700 }}>
          fastcart
        </Typography>

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            bgcolor: '#1e293b',
            px: 2,
            py: 0.5,
            borderRadius: 2,
            width: 300
          }}
        >
          <SearchIcon sx={{ color: '#94a3b8' }} />
          <InputBase
            placeholder="Search…"
            sx={{ ml: 1, color: 'white', width: '100%' }}
          />
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <IconButton color="inherit">
            <Badge badgeContent={5} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>

          <Avatar sx={{ bgcolor: '#22c55e' }}>R</Avatar>
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default Topbar
