import React from 'react'
import { Button, Card, CardBody, CardHeader, Modal, ModalBody, ModalFooter, ModalHeader, Table } from 'reactstrap'

function VendorView( {modal, setModal, viewData}) {
 
    console.log("viewData", viewData);
    const toggle = () => {
      setModal(!modal);
    }
    return (
      <Modal isOpen={modal} toggle={toggle}>
      <ModalHeader className="text-center">
        Vendor Details
      </ModalHeader>
      <ModalBody >
        <Table bordered>
          <tbody>
            <tr>
              <th style={{ width: "20%" }}>Vendnor Name</th>
              <td style={{ width: "80%" }}>{viewData?.fname+""+viewData?.lname}</td>
            </tr>
            <tr>
              <th style={{ width: "20%" }}>Vendnor Name</th>
              <td style={{ width: "80%" }}>{viewData?.email}</td>
            </tr>
            <tr>
              <th style={{ width: "20%" }}>Phone Number</th>
              <td style={{ width: "80%" }}>{viewData?.vendorphone}</td>
            </tr>
            <tr>
            <th style={{ width: "20%" }}>Status</th>
            <td style={{ width: "80%" }}>{viewData?.vendorstatus}</td>
          </tr>
            <tr>
              <th style={{ width: "20%" }}>Selected Services</th>
              <td style={{ width: "80%" }}>{viewData?.service.map(item => item+",")}</td>
              </tr>
          </tbody>
        </Table>
      </ModalBody>
      <ModalFooter>
        <Button color='secondary' onClick={toggle}>Close</Button>
      </ModalFooter>
    </Modal>
    )
}

export default VendorView
