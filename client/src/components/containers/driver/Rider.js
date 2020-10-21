import React from "react";
import { Table } from "reactstrap";
import RiderList from "./RiderList";
import Paginations from "../../views/Pagination";

const styles = {
  table: {
    fontSize: 12,
    background: "#fff",
  },
  thead: {
    background: "#26ACD144",
  },
  th: {
    padding: "7px"
  }
}

const Rider = ({ filteredContents, match, data, riders, pageOfItems, onChangePage }) => {
  return (
    <div>
      <Table bordered style={styles.table} responsive>
        <thead style={styles.thead}>
          <tr>
            <th style={styles.th}>First name</th>
            <th style={styles.th}>Last name</th>
            <th style={styles.th}>Phone number</th>
            <th style={styles.th}>Email address</th>
            <th style={styles.th}>Status</th>
            <th style={styles.th}>Availability</th>
            <th style={styles.th}>Online</th>
            <th style={styles.th}>Income</th>
            <th style={styles.th}>View details</th>
            <th style={styles.th}>Action</th>
          </tr>
        </thead>
        <RiderList filteredContents={filteredContents} match={match} riders={riders} pageOfItems={pageOfItems} />
      </Table>
      {data && data.length ? <Paginations items={data} onChangePage={onChangePage} /> : null}
    </div>
  );
}

export default Rider;