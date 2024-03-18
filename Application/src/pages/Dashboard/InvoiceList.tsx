import React from 'react'
import { Card, Col, Dropdown } from 'react-bootstrap';
import {invoiceList} from "../../Common/data/index"
import { Link } from 'react-router-dom';

const InvoiceList = () => {
  return (
    <React.Fragment>
                        <Col xl={5}>
                            <Card>
                                <Card.Header className="border-0 align-items-center d-flex">
                                    <h4 className="card-title mb-0 flex-grow-1">Invoice List</h4>
                                    <Dropdown>
                                        <Dropdown.Toggle as="a" className="text-reset arrow-none">
                                            <span className="fw-semibold text-uppercase fs-14">Sort By: </span>  <span className="text-muted">Weekly<i className="las la-angle-down fs-12 ms-2"></i></span>                                          
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu className="dropdown-menu-end" aria-labelledby="dropdownMenuButton1">
                                            <Dropdown.Item>Monthly</Dropdown.Item>
                                            <Dropdown.Item>Yearly</Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </Card.Header>
                                <Card.Body className="pt-2">
                                    <div className="table-responsive table-card">
                                        <table className="table table-striped table-nowrap align-middle mb-0">
                                            <thead>
                                                <tr className="text-muted text-uppercase">
                                                    <th style={{width: "50px"}}>
                                                        <div className="form-check">
                                                            <input className="form-check-input" type="checkbox" id="checkAll" value="option" />
                                                        </div>
                                                    </th>
                                                    <th scope="col">Invoice ID</th>
                                                    <th scope="col">Client</th>
                                                    <th scope="col">Date</th>
                                                    <th scope="col" style={{width: "16%"}}>Status</th>
                                                    <th scope="col" style={{width: "12%"}}>Action</th>
                                                </tr>
                                            </thead>
        
                                            <tbody>
                                            {invoiceList.map((invoiceListData: any, key: any) => (
                                                <tr key={key}>
                                                    <td>
                                                        <div className="form-check">
                                                            <input className="form-check-input" type="checkbox" id="check1" value="option" />
                                                        </div>
                                                    </td>
                                                    <td><p className="mb-0">{invoiceListData.invoiceID}</p></td>
                                                    <td>
                                                        <img src={invoiceListData.clientImg} alt="" className="avatar-xs rounded-circle me-2" />
                                                        <Link to="#" className="text-body align-middle">{invoiceListData.clientName}</Link>
                                                    </td>
                                                    <td>{invoiceListData.date}</td>
                                                    <td><span className={`badge ${invoiceListData.statusClass} p-2`}>{invoiceListData.status}</span></td>
                                                    <td>
                                                        <Dropdown>
                                                            <Dropdown.Toggle as="button" className="btn btn-soft-secondary btn-sm arrow-none" size="sm">
                                                                <i className="las la-ellipsis-h align-middle fs-18"></i>
                                                            </Dropdown.Toggle>
                                                            <Dropdown.Menu className="dropdown-menu-end">
                                                                <li>
                                                                    <Dropdown.Item><i className="las la-eye fs-18 align-middle me-2 text-muted"></i>
                                                                        View</Dropdown.Item>
                                                                </li>
                                                                <li>
                                                                    <Dropdown.Item ><i className="las la-pen fs-18 align-middle me-2 text-muted"></i>
                                                                        Edit</Dropdown.Item>
                                                                </li>
                                                                <li>
                                                                    <Dropdown.Item><i className="las la-file-download fs-18 align-middle me-2 text-muted"></i>
                                                                        Download</Dropdown.Item>
                                                                </li>
                                                                <li className="dropdown-divider"></li>
                                                                <li>
                                                                    <Dropdown.Item className="remove-item-btn" href="#">
                                                                        <i className="las la-trash-alt fs-18 align-middle me-2 text-muted"></i>
                                                                        Delete
                                                                    </Dropdown.Item>
                                                                </li>
                                                            </Dropdown.Menu>
                                                        </Dropdown>
                                                    </td>
                                                </tr>
        
                                            ))}
                                                
                                            </tbody>
                                        </table>
                                    </div>

                                </Card.Body>
                            </Card>
                        </Col> 
    </React.Fragment>
  )
}

export default InvoiceList
