import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import img from './logo-transparent-png.png';
// material-ui
import { ButtonBase } from '@mui/material';

// project imports
import config from 'config';
import Logo from 'ui-component/Logo';
import { MENU_OPEN } from 'store/actions';

// ==============================|| MAIN LOGO ||============================== //

const LogoSection = () => {
  const defaultId = useSelector((state) => state.customization.defaultId);
  const dispatch = useDispatch();
  return (
    <ButtonBase
      sx={{ ml: 4 }}
      disableRipple
      onClick={() => dispatch({ type: MENU_OPEN, id: defaultId })}
      component={Link}
      to={config.defaultPath}
    >
      {/* <Logo /> */}
      <img src={img} alt="No logo found" width={50} height={50} style={{ color: 'red' }}></img>
    </ButtonBase>
  );
};

export default LogoSection;
