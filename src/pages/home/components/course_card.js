import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'

const Card = props => {
  const { onclick, id, name, programid, tutorid, description, imgCoverUrl } = props

  return (
    <Paper
      onClick={onclick}
      sx={{ display: 'flex', py: 4, '&:hover': { bgcolor: '#f7f7f8' } }}
      square
      variant='outlined'
    >
      <Box width={'10%'} display={'flex'} justifyContent={'center'}>
        {id}
      </Box>
      <Box width={'20%'} display={'flex'} justifyContent={'center'}>
        {name}
      </Box>
      <Box width={'20%'} display={'flex'} justifyContent={'center'}>
        {programid}
      </Box>
      <Box width={'10%'} display={'flex'} justifyContent={'center'}>
        {tutorid}
      </Box>
      <Box width={'10%'} display={'flex'} justifyContent={'center'}>
        {' '}
        {description}
      </Box>
      <Box width={'30%'} display={'flex'} justifyContent={'center'}>
        {imgCoverUrl}
      </Box>
    </Paper>
  )
}

export default Card
