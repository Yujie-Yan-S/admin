// // ** MUI Imports
// import Box from '@mui/material/Box'
//
// // ** Components
// import ModeToggler from 'src/@core/layouts/components/shared-components/ModeToggler'
// import UserDropdown from 'src/@core/layouts/components/shared-components/UserDropdown'
//
// const AppBarContent = props => {
//   // ** Props
//   const { settings, saveSettings } = props
//
//   return (
//     <Box sx={{ display: 'flex', alignItems: 'center' }}>
//       <ModeToggler settings={settings} saveSettings={saveSettings} />
//       <UserDropdown settings={settings} />
//     </Box>
//   )
// }
//
// export default AppBarContent

import Box from '@mui/material/Box'
import Navigation from '../CustomNavigation'
import UserDropdown from 'src/@core/layouts/components/shared-components/UserDropdown'
import Typography from "@mui/material/Typography";

const AppBarContent = props => {
  const { settings, horizontalNavItems } = props

  return (
    <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <Navigation settings={settings} horizontalNavItems={horizontalNavItems} />
      <Typography variant="h6" noWrap sx={{width: 100 ,fontWeight: 'bold' }}>
        Log In
      </Typography>
      <Typography variant="h6" noWrap sx={{width: 100 ,fontWeight: 'bold' }}>
        Sign Up
      </Typography>
    </Box>
  )
}

export default AppBarContent
