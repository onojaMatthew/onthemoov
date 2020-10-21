import React from "react";
import { Table, } from "reactstrap";
import Paginations from "../../views/Pagination";
import CustomerList from "./CustomerList";

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

const Customers = ({ filteredContents, match, data, customers, onChangePage, pageOfItems}) => {
  return (
    <div>
      <Table bordered style={styles.table}>
        <thead style={styles.thead}>
          <tr>
            <th style={styles.th}>S/N</th>
            <th style={styles.th}>Customer name</th>
            <th style={styles.th}>Phone number</th>
            <th style={styles.th}>Email address</th>
            <th style={styles.th}>Date joined</th>
            <th style={{textAlign: "center", ...styles.th}}>View</th>
            <th style={{textAlign: "center", ...styles.th}}>Delete</th>
          </tr>
        </thead>
        <CustomerList filteredContents={filteredContents} match={match} customers={customers} pageOfItems={pageOfItems} />
      </Table>
      {data && data.length ? <Paginations items={data} onChangePage={onChangePage} /> : null}
    </div>
  );
}

export default Customers;