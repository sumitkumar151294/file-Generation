/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import Button from "../../Components/Button";
import InputField from "../../Components/InputField/InputField";
import Loader from "../../Components/Loader/Loader";

const VariableDictionaryForm = ({
  data,
  setData,
  isDelete,
}) => {
  return (
    <>
      <div className="container-fluid form">
        <div className="row">
          <div className="col-xl-12 col-xxl-12">
            <div className="card">
              <div className="card-header">
                <h4 className="card-title">Variable Dictionary</h4>
              </div>
              <div className="card-body">
                {false ? (
                  <div style={{ height: "400px" }}>
                    <Loader classType={"absoluteLoader"} />
                  </div>
                ) : (
                  <div className="container-fluid">
                    <form
                    // onSubmit={handleSubmit}
                    >
                      <div className="row">
                        <div className="col-sm-4 form-group mb-2">
                          <label htmlFor="amount">
                          Variable Name
                            <span className="text-danger">*</span>
                          </label>
                          <InputField
                            type="text"
                            name="text"
                            // value={vendorData?.balanceThresholdAmount}
                            // className={` ${
                            //   errors.balanceThresholdAmount
                            //     ? "border-danger"
                            //     : "form-control"
                            // }`}
                            className="form-control"

                            id="amominThresholdAmountunt"
                            // placeholder="₹500000"
                            // onChange={(e) =>
                            //   handleChange(e, "balanceThresholdAmount")
                            // }
                          />
                        </div>

                        <div className="col-sm-4 form-group mb-2">
                          <label htmlFor="availabelAmount">
                          Variable
                            <span className="text-danger">*</span>
                          </label>
                          <InputField
                            type="text"
                            name="text"
                            // value={vendorData.creditAmount}
                            // className={` ${
                            //   errors.creditAmount
                            //     ? "border-danger"
                            //     : "form-control"
                            // }`}
                            className="form-control"

                            id="creditAmount"
                            // placeholder="₹500000"
                            // onChange={(e) => handleChange(e, "creditAmount")}
                          />
                        </div>
                        <div className="col-sm-12 form-group mb-0 mt-2">
                          <Button
                            text="Submit"
                            icon={"fa fa-arrow-right"}
                            className="btn btn-primary float-right pad-aa mt-2"
                          />
                          <ToastContainer />
                        </div>
                      </div>
                    </form>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default VariableDictionaryForm;
/* eslint-enable react-hooks/exhaustive-deps */
