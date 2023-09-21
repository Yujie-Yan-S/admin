import useMediaQuery from '@mui/material/useMediaQuery'

// ** Layout Imports
// !Do not remove this Layout import
import Layout from 'src/@core/layouts/Layout'


// ** Navigation Imports
import VerticalNavItems from 'src/navigation/vertical'
import HorizontalNavItems from 'src/navigation/horizontal'

// ** Component Import
// Uncomment the below line (according to the layout type) when using server-side menu
// import ServerSideVerticalNavItems from './components/vertical/ServerSideNavItems'
// import ServerSideHorizontalNavItems from './components/horizontal/ServerSideNavItems'

import VerticalAppBarContent from './components/vertical/AppBarContent'
import HorizontalAppBarContent from './components/horizontal/AppBarContent'

// ** Hook Import
import {useSettings} from 'src/@core/hooks/useSettings'

// ** MUI import
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import {red} from "@mui/material/colors";
import {router} from "next/client";

const UserLayout = ({children, contentHeightFixed}) => {
  // ** Hooks
  const {settings, saveSettings} = useSettings()

  // ** Vars for server side navigation
  // const { menuItems: verticalMenuItems } = ServerSideVerticalNavItems()
  // const { menuItems: horizontalMenuItems } = ServerSideHorizontalNavItems()
  /**
   *  The below variable will hide the current layout menu at given screen size.
   *  The menu will be accessible from the Hamburger icon only (Vertical Overlay Menu).
   *  You can change the screen size from which you want to hide the current layout menu.
   *  Please refer useMediaQuery() hook: https://mui.com/material-ui/react-use-media-query/,
   *  to know more about what values can be passed to this hook.
   *  ! Do not change this value unless you know what you are doing. It can break the template.
   */
  const hidden = useMediaQuery(theme => theme.breakpoints.down('lg'))
  if (hidden && settings.layout === 'horizontal') {
    settings.layout = 'vertical'
  }

  // const Menu = () => {
  //   return (
  //     <ul>
  //       <li>Menu Item 1</li>
  //       <li>Menu Item 2</li>
  //       <li>Menu Item 3</li>
  //       <li>Menu Item 4</li>
  //       <li>Menu Item 5</li>
  //     </ul>
  //   )
  // }
  const handleClick = (e) => {
    router.push('/home')
  }

  const AppBrand = () => {
    return (
      <Box onClick={handleClick} sx={{display: 'flex', alignItems: 'center'}}>
        <style jsx>{`
          img:hover {
            opacity: 0.8;
            cursor: pointer;
          }
          text:hover{
            opacity: 0.8;
            cursor: pointer;
          }
      `}</style>
        <img src='/brand-icon.png' alt='logo' width='28' height='28' />


        <Typography sx={{fontSize: 20, pl:4, mr: 10, display: 'flex',justifyContent:'center', alignItems: 'center'}} noWrap fontWeight="bold">
          <text>AI ROBOTO EDU</text>
        </Typography>

      </Box>
    )
  }

  return (
    <Layout
      hidden={hidden}
      settings={settings}
      saveSettings={saveSettings}
      contentHeightFixed={contentHeightFixed}
      verticalLayoutProps={{
        navMenu: {
          navItems: VerticalNavItems()

          // Uncomment the below line when using server-side menu in vertical layout and comment the above line
          // navItems: verticalMenuItems
        },
        appBar: {
          content: props => (
            <VerticalAppBarContent
              hidden={hidden}
              settings={settings}
              saveSettings={saveSettings}
              toggleNavVisibility={props.toggleNavVisibility}
            />
          )
        }
      }}
      {...(settings.layout === 'horizontal' && {
        horizontalLayoutProps: {
          // navMenu: {
          //   navItems: HorizontalNavItems()
          //
          //   // Uncomment the below line when using server-side menu in horizontal layout and comment the above line
          //   // navItems: horizontalMenuItems
          // },

          // navMenu: {
          //   content: () => 'I am menu which is overridden by the user'
          // },

          // appBar: {
          //   content: () => <HorizontalAppBarContent settings={settings} saveSettings={saveSettings} />
          // }
          appBar: {
            content: () => (
              <HorizontalAppBarContent settings={settings} horizontalNavItems={HorizontalNavItems()}/>
            ),
            branding: () => <AppBrand/>,
            componentProps:{
              sx:{
                height:77
              }
            }
          }
        }
      })}
    >
      {children}

    </Layout>
  )
}

export default UserLayout
