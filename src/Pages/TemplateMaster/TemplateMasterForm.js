/* eslint-disable react-hooks/exhaustive-deps */

import React, { useEffect, useState } from "react";
import Dropdown from "../../Components/Dropdown/Dropdown";
import HtmlEditor from "../../Components/HtmlEditor/HtmlEditor";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import Button from "../../Components/Button/Button";
import { useDispatch, useSelector } from "react-redux";
import {
  onGettemplateMaster,
  onPosttemplateMaster,
  onPosttemplateMasterReset,
  onUpdatetemplateMaster,
} from "../../Store/Slices/templateMasterSlice";
import { ToastContainer, toast } from "react-toastify";
import Loader from "../../Components/Loader/Loader";
import VariableDictionary from "../VariableDictionary/VariableDictionary";
const statusOptions = [
  { value: true, label: "Active" },
  { value: false, label: "Non Active" },
];
const TemplateMasterForm = ({ templateMaster }) => {
  const [intialValue, setInitialValue] = useState({
    clientId: "",
    templateName: "",
    templateContent: "",
    templateTypeId: "",
    fileTypeId: "",
    enabled: "",
    isChild: "",
  })
  const [button, setButton] = useState("Submit");
  const dispatch = useDispatch();
  const clientMasterData = useSelector(
    (state) => state?.clientMasterReducer?.getclientMasterData
  );
  const templateTypeMasterData = useSelector(
    (state) => state?.templateTypeMasterReducer?.gettemplateTypeMasterData
  );
  const fileTypeData = useSelector(
    (state) => state?.fileTypeReducer?.getfileTypeData
  );
  const templateMasterData = useSelector(
    (state) => state.templateMasterReducer
  );
  const clientOptions = clientMasterData.filter(clientData => clientData?.enabled).map((clientData) => ({
    value: clientData?.id,
    label: clientData?.clientName,
  }));
  const templateTypeOptions = templateTypeMasterData.filter(templateType => templateType?.enabled).map((templateType) => ({
    value: templateType?.id,
    label: templateType?.templateType,
  }));
  const fileTypeOptions = fileTypeData.filter(fileTypeData => fileTypeData?.enabled).map((fileTypeData) => ({
    value: fileTypeData?.id,
    label: fileTypeData?.fileType,
  }));
  const validations = Yup.object().shape({
    clientId: Yup.string().required("Client is required"),
    templateName: Yup.string().required("Template Name is required"),
    templateContent: Yup.string().required("Template Content is required"),
    templateTypeId: Yup.string().required("Template Type is required"),
    fileTypeId: Yup.string().required("File Type is required"),
    enabled: Yup.string().required("Status is required"),
  });
  const handleSumbit = (values) => {
    const templateMasterData = {
      ...values,
      enabled: values.enabled === "true" ? true : false,
      deleted: false,
      isChild: values.isChild ? true : false
    };
    if (button === "Submit") {
      dispatch(onPosttemplateMaster(templateMasterData));
    } else {
      dispatch(onUpdatetemplateMaster(templateMasterData))
      setInitialValue({
        clientId: "",
        templateName: "",
        templateContent: "",
        templateTypeId: "",
        fileTypeId: "",
        enabled: "",
        isChild: "",
      })
      setButton("Submit")
    }
  };
  useEffect(() => {
    if (templateMasterData?.post_status_code === "201") {
      toast.success(templateMasterData.postMessage);
      dispatch(onGettemplateMaster())
      dispatch(onPosttemplateMasterReset());
    } else if (templateMasterData?.post_status_code) {
      toast.error(templateMasterData.postMessage);
      dispatch(onPosttemplateMasterReset());
    }
  }, [templateMasterData]);
  useEffect(() => {
    if (templateMaster) {
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
      setInitialValue(templateMaster);
      setButton("Update");
    }
  }, [templateMaster])
  return (
    <>
      <ToastContainer />
      <div className="row">
        <div className="col-xl-8">
          <div className="card mb-4">
            <div className="card-header">
              <h4 className="card-title">Template Master</h4>
            </div>
            <div className="card-body ">
              {templateMasterData?.postLoading ? (
                <div style={{ height: "200px" }}>
                  <Loader classType={"absoluteLoader"} />
                </div>
              ) : (
                <div className="container-fluid">
                  <Formik
                    initialValues={intialValue}
                    enableReinitialize={true}
                    validationSchema={validations}
                    onSubmit={handleSumbit}
                  >
                    {({ errors, touched }) => (
                      <Form>
                        <div className="row">
                          <div className="col-sm-4 form-group mb-2">
                            <label> Client Name</label>
                            <Field
                              name="clientId"
                              component={Dropdown}
                              options={clientOptions}
                              className={`form-select ${errors.clientId && touched.clientId
                                  ? "is-invalid"
                                  : ""
                                }`}
                            />
                            <ErrorMessage
                              name="clientId"
                              component="div"
                              className="error-message"
                            />
                          </div>

                          <div className="col-sm-4 form-group mb-2">
                            <label>Template Name</label>
                            <Field
                              type="text"
                              name="templateName"
                              className={`form-control ${errors.templateName && touched.templateName
                                  ? "is-invalid"
                                  : ""
                                }`}
                              placeholder="Enter Template Name"
                            />
                            <ErrorMessage
                              name="templateName"
                              component="div"
                              className="error-message"
                            />
                          </div>
                          <div className="col-lg-4 py-4">
                            <div className="form-check  mb-2 padd">
                              <Field
                                type="checkbox"
                                className="form-check-input"
                                name="isChild"
                              />
                              <label className="px-1">Child Template</label>
                            </div>
                          </div>
                          <div className="form-group mb-2">
                            <label>Template Content </label>
                            <Field
                              name="templateContent"
                              component={HtmlEditor}
                            />
                            <ErrorMessage
                              name="templateContent"
                              component="div"
                              className="error-message"
                            />
                          </div>

                          <div className="col-sm-4 form-group mb-2">
                            <label for="pass"> Template Type </label>
                            <Field
                              name="templateTypeId"
                              component={Dropdown}
                              options={templateTypeOptions}
                              className={`form-select ${errors.templateTypeId && touched.templateTypeId
                                  ? "is-invalid"
                                  : ""
                                }`}
                            />
                            <ErrorMessage
                              name="templateTypeId  "
                              component="div"
                              className="error-message"
                            />
                          </div>

                          <div className="col-sm-4 form-group mb-2">
                            <label for="pass"> File Type </label>
                            <Field
                              name="fileTypeId"
                              component={Dropdown}
                              options={fileTypeOptions}
                              className={`form-select ${errors.fileTypeId && touched.fileTypeId
                                  ? "is-invalid"
                                  : ""
                                }`}
                            />
                            <ErrorMessage
                              name="fileTypeId"
                              component="div"
                              className="error-message"
                            />
                          </div>
                          <div className="col-sm-4 form-group mb-2">
                            <label for="pass"> Status </label>
                            <Field
                              name="enabled"
                              component={Dropdown}
                              options={statusOptions}
                              className={`form-select ${errors.enabled && touched.enabled
                                  ? "is-invalid"
                                  : ""
                                }`}
                            />
                            <ErrorMessage
                              name="enabled"
                              component="div"
                              className="error-message"
                            />
                          </div>

                          <div className="row">
                            <div className="col-sm-12 form-group mb-0 mt-2">
                              <Button
                                text={button}
                                icon="fa fa-arrow-right"
                                className="btn btn-primary float-right pad-aa mt-2"
                              />
                            </div>
                          </div>
                        </div>
                      </Form>
                    )}
                  </Formik>
                </div>
              )}
            </div>
          </div>
        </div>

        <VariableDictionary />
      </div>
    </>
  );
};

export default TemplateMasterForm;
/* eslint-enable react-hooks/exhaustive-deps */
