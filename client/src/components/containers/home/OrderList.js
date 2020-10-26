import React from "react";
import { Table } from "reactstrap";
import OrderListview from "./OrderListView";
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
const OrderList = ({ orders, data, onChangePage, pageOfItems }) => {
  return (
    <div>
      <Table responsive bordered style={styles.table}>
        <thead style={styles.thead}>
          <tr>
            <th style={styles.th}>S/N</th>
            <th style={styles.th}>Customer name</th>
            <th style={styles.th}>Driver name</th>
            <th style={styles.th}>Vehicle type</th>
            <th style={styles.th}>Amount</th>
            <th style={styles.th}>Status</th>
          </tr>
        </thead>
        <OrderListview orders={orders} pageOfItems={pageOfItems} />
      </Table>
      {data && data.length > 0 ? <Paginations items={data} onChangePage={onChangePage} /> : null}
    </div>
  );
}

export default OrderList;