import { useDispatch } from 'react-redux';
import { resetBookings } from '../features/bookingsSlice';

export default function Header() {
    const styles = {
      headerContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '10px 20px',
        backgroundColor: '#fff',
        color: 'white'
      },
      logoContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
      },
      logo: {
        width: '30px',
        height: '30px',
        marginRight: '10px'
      },
      title: {
        fontFamily: "Lucida Console, monospace",
        fontSize: '20px',
        color: '#333',
        textTransform: 'uppercase',
      }
    };

    const dispatch = useDispatch();

    const handleReset = (e) => {
        e.preventDefault();
        dispatch(resetBookings())
    }
  return (
    <div style={styles.headerContainer}>
    <div style={styles.logoContainer}>
      <img src='https://cdn-icons-png.flaticon.com/512/10337/10337440.png' alt='Logo' style={styles.logo} />
      <h1 style={styles.title}>Admin Bookings Dashboard</h1>
      </div>
      <div>
        <a href='#' onClick={handleReset}><img src='https://static.thenounproject.com/png/3574480-200.png' alt='home' style={{...styles.logo, width: '40px', height: '40px'}}></img></a>
      </div>
    </div>
  );
}