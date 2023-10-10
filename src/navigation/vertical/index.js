const navigation = () => {
  return [
    {
      title: 'Course',
      path: '/home',
      icon: 'mdi:home-outline',
    },
    {
      title: 'Second Page',
      path: '/second-page',
      icon: 'mdi:email-outline',
    },
    {
      path: '/acl',
      action: 'read',
      subject: 'acl-page',
      title: 'Access Control',
      icon: 'mdi:shield-outline',
    },
    {
      title: 'User',
      path: '/user',
      icon: 'mdi:home-outline',
    },
    {
      title: 'Project',
      path: '/project',
      icon: 'mdi:home-outline',
    },

  ]
}

export default navigation
