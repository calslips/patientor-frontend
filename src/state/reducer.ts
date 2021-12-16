import { State } from "./state";
import { Patient, Diagnosis } from "../types";

export type Action =
  | {
      type: "SET_PATIENT_LIST";
      payload: Patient[];
    }
  | {
      type: "ADD_PATIENT";
      payload: Patient;
    }
  | {
      type: "SHOW_CURRENT_PATIENT";
      payload: Patient;
    }
  | {
     type: "SET_DIAGNOSES_LIST";
     payload: Diagnosis[];
    };

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients
        }
      };
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
    case "SHOW_CURRENT_PATIENT":
      return {
        ...state,
        currentPatient: action.payload
      };
    case "SET_DIAGNOSES_LIST":
      return {
        ...state,
        diagnoses: {
          ...action.payload.reduce(
            (memo, diagnosis) => ({ ...memo, [diagnosis.code]: diagnosis }),
            {}
          ),
          ...state.diagnoses
        }
      };
    default:
      return state;
  }
};

export const setPatientList = (listOfPatients: Patient[]): Action => {
  return {
    type: "SET_PATIENT_LIST",
    payload: listOfPatients
  };
};

export const addPatient = (newPatientData: Patient): Action => {
  return {
    type: "ADD_PATIENT",
    payload: newPatientData
  };
};

export const showSinglePatient = (patientData: Patient): Action => {
  return {
    type: "SHOW_CURRENT_PATIENT",
    payload: patientData
  };
};

export const setDiagnosesList = (listOfDiagnoses: Diagnosis[]): Action => {
  return {
    type: "SET_DIAGNOSES_LIST",
    payload: listOfDiagnoses
  };
};
