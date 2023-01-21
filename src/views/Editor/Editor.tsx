import { StyledEngineProvider } from '@mui/material/styles';
import MainDrawer from '../../components/Structure/MainDrawer';


export default function Editor() {
  return (
    <StyledEngineProvider injectFirst>
      <MainDrawer />
    </StyledEngineProvider>
  )
}