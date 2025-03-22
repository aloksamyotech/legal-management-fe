import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import img from './logo-transparent-png.png';
// material-ui
import { ButtonBase } from '@mui/material';

// project imports
import config from 'config';
import Logo from 'ui-component/Logo';
import { MENU_OPEN } from 'store/actions';
import { urls } from 'core/Constant/Urls';
import { useState } from 'react';
import { useEffect } from 'react';
import { getApi } from 'core/APIs/ApiDocuments';

// ==============================|| MAIN LOGO ||============================== //

const LogoSection = () => {
  const [logoImage, setlogoImage] = useState(null);
  const defaultId = useSelector((state) => state.customization.defaultId);
  const dispatch = useDispatch();
  const fetchuserData = async () => {
    try {
      const response = await getApi(urls?.user?.Getlogo);
      setlogoImage(response?.data?.companyLogo);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchuserData();
  }, []);
  return (
    <ButtonBase
      sx={{ ml: 6 }}
      disableRipple
      onClick={() => dispatch({ type: MENU_OPEN, id: defaultId })}
      component={Link}
      to={config.defaultPath}
    >
      {/* <Logo /> */}
      <img src={logoImage ? urls?.initialbase + logoImage : img} alt="company logo" width={50} height={50} style={{ color: 'red' }}></img>
    </ButtonBase>
  );
};

export default LogoSection;
