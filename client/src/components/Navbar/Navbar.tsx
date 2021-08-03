import React, { useEffect, useState } from "react";
import useStyles from './styles';
import { AppBar, Button, Toolbar, Typography, IconButton } from "@material-ui/core";
import { Menu } from "@material-ui/icons";
import { Link, useHistory, useLocation } from 'react-router-dom';
import formsIcon from '../../images/forms-icon.png';
import { useDispatch } from 'react-redux';
import * as actionType from '../../constants/actionTypes';
import decode from 'jwt-decode';
import { Avatar } from "@material-ui/core";

const Navbar = () => {
    const classes = useStyles();
    const history = useHistory();
    const location = useLocation();
    const handleLogin = () => history.push('/loginUser');
    const profile = localStorage.getItem('profile')!;
    const [user, setUser] = useState(JSON.parse(profile));
    const dispatch = useDispatch();

    const logout = () => {
        dispatch({ type: actionType.LOGOUT });

        history.push('/');

        setUser(null);
    };

    useEffect(() => {
        const token = user?.token;

        if (token) {
            const decodedToken = decode<any>(token);

            if (decodedToken.exp * 1000 < new Date().getTime()) logout();
        }

        setUser(JSON.parse(profile));
    }, [location]);


    return (
        <div className={classes.root} style={{ position: "absolute", left: "0", top: "0" }}>
            <AppBar color="secondary">
                <Toolbar>
                    <Typography variant="h6" className={classes.title} align="center">
                        <Link to="/" style={{textDecoration: "none", color: "#fff"}}>
                            <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                <div>Kacper Mitkowski's Forms</div>
                                <div style={{ marginLeft: "20px" }}>
                                    <img src={formsIcon} alt="icon" height="45px" />
                                </div>
                            </div>
                        </Link>
                    </Typography>
                    {user?.result ?
                        <div style={{ display: "flex" }}>
                            <Avatar className={classes.purple} alt={user?.result.name} src={user?.result.imageUrl}>{user?.result.name.charAt(0)}</Avatar>
                            <Typography className={classes.userName} variant="h6">{user?.result.name}</Typography>
                            <Button variant="contained" style={{ marginLeft: "20px" }} color="secondary" onClick={logout}>Logout</Button>
                        </div>
                        :
                        <Button color="inherit" onClick={handleLogin}>Sign In</Button>
                    }

                </Toolbar>
            </AppBar>
        </div>
    );
}

export default Navbar;