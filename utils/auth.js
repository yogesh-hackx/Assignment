import cookie from 'js-cookie';
import Router from 'next/router';

export function handleLogin(data) {
    cookie.set('userData', data);
    localStorage.setItem('userData', JSON.stringify(data));
    if (data.isAdmin)
        Router.push('/admin');
    else
        Router.push('/');
}

export function handleLogout() {
    cookie.remove('userData');
    localStorage.removeItem('userData');
    Router.push('/');
}