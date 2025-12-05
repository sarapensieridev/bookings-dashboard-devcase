import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBookings } from "../features/bookingsSlice";

const styles = {
  bookingContainer: {
    padding: "20px",
    maxWidth: "1200px",
    margin: "0 auto",
    fontFamily: "Lucida Console, monospace",
  },
  bookingTable: {
    display: "grid",
    gap: "1.5px",
    background: "#e0e0e0",
    borderRadius: "8px",
    overflow: "hidden",
    margin: "20px 0",
    border: "1px solid #ccc",
  },
  tableHeader: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr",
    gap: "1px",
    background: "#333",
    color: "white",
    fontWeight: "bold",
  },
  tableRow: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr",
    gap: "1px",
    background: "white",
    transition: "background 0.2s",
    cursor: "pointer",
  },
  cell: {
    padding: "12px 16px",
    background: "inherit",
  },
  buttonContainer: {
    justifyContent: "flex-end",
    display: "flex",
    alignItems: "center",   
    marginBottom: "10px",
},
  button: {
    padding: "10px 20px",
    background: "#ee6c4d",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "14px",
    marginTop: "20px",
    fontFamily: "Lucida Console, monospace",
  },
  buttonDisabled: {
    background: "#999",
    cursor: "not-allowed",
  },
  editIcon: {
    cursor: "pointer",
    color: "#333",
  },
  message: {
    textAlign: 'center',
    marginTop: '10px',
    backgroundColor: '#ee6c4d',
    color: '#fff',
    width: '200px',
    padding: "10px 20px",
    borderRadius: '4px',
    marginRight: '300px',
    fontSize: '14px',
  }
};

export default function BookingList() {
  const dispatch = useDispatch();
  const { items, nextPageToken, loading } = useSelector((s) => s.bookings);

  const loadMore = () => {
    dispatch(fetchBookings(nextPageToken));
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const hasMore = nextPageToken !== null;
  const canLoad = !loading && (items.length === 0 || hasMore);

  const sortedItems = [...items].sort((a, b) => {
    const dateA = new Date(a.checkIn || 0);
    const dateB = new Date(b.checkIn || 0);
    return dateB - dateA;
  });

  const [showMessage, setShowMessage] = React.useState(false);

  useEffect(() => {
  if (!hasMore && items.length > 0 && !showMessage) {
    setShowMessage(true);
    setTimeout(() => setShowMessage(false), 3000); // Hide after 3 seconds
  }
}, [hasMore, items.length]);

  return (
    <div style={styles.bookingContainer}>
    <h2>Bookings</h2>

      <div style={styles.bookingTable}>
        <div style={styles.tableHeader}>
          <div style={styles.cell}>Booking ID</div>
          <div style={styles.cell}>Guest Name</div>
          <div style={styles.cell}>Guests</div>
          <div style={styles.cell}>Check-in</div>
          <div style={styles.cell}>Check-out</div>
        </div>

        {sortedItems.map((b) => (
          <div
            key={b.bookingId}
            style={styles.tableRow}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#f5f5f5")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "white")}
          >
            <div style={styles.cell}>{b.bookingId}</div>
            <div style={styles.cell}>{b.guest?.name || "N/A"}</div>
            <div style={styles.cell}>{b.guestsNumber}</div>
            <div style={styles.cell}>{formatDate(b.checkIn) || "N/A"}</div>
            <div style={styles.cell}>{formatDate(b.checkOut) || "N/A"}</div>
          </div>
        ))}
      </div>

<div style={styles.buttonContainer}>

      <button
        onClick={loadMore}
        disabled={!canLoad}
        style={{
          ...styles.button,
          ...(!canLoad ? styles.buttonDisabled : {}),
        }}
      >
        {loading
          ? "Loading..."
          : items.length === 0
          ? "Load Bookings"
          : hasMore
          ? "Load More"
          : "No More Bookings"}
      </button>
      </div>
{!hasMore && items.length > 0 && showMessage && (
  <div style={{
    position: 'fixed',
    top: '20px',
    left: '50%',
    transform: 'translateX(-50%)',
    backgroundColor: '#ee6c4d',
    color: '#fff',
    padding: '15px 30px',
    borderRadius: '10px',
    boxShadow: '0 4px 6px rgba(0,0,0,0.3)',
    zIndex: 1000,
    animation: 'slideDown 0.3s ease-out'
  }}>
    All bookings loaded! 🎉
  </div>
)}
    </div>
  );
}
