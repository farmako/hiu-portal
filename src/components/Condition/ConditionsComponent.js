/* eslint-disable react/no-array-index-key */
import React from 'react';
import * as PropTypes from 'prop-types';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { formatDateString, getConceptDisplay } from '../common/HealthInfo/FhirResourcesUtils';
import TableStyles from '../common/Styles/Table.style';
import AdditionalNotes from '../AdditionalNotes';
import ConditionCategory from './ConditionCategory';
import ConditionOnset from './ConditionOnset';

const ConditionsComponent = ({ conditionList }) => (conditionList && conditionList.length > 0 ? (
  <TableStyles>
    <TableContainer className="table-container" component={Paper}>
      <Table className="table" aria-label="simple table">
        <TableHead>
          <TableRow className="table-head">
            <TableCell className="header" colSpan={4}>
              Condition:
            </TableCell>
          </TableRow>
          <TableRow className="table-head">
            <TableCell align="left">Recorded Date</TableCell>
            <TableCell align="left">Condition</TableCell>
            <TableCell align="left">Status</TableCell>
            <TableCell align="left">Additional Notes</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {conditionList.map((condition, i) => (
            <TableRow key={i}>
              <TableCell className="table-cell">
                {condition.recordedDate
                  ? formatDateString(condition.recordedDate)
                  : ''}
              </TableCell>
              <TableCell className="table-cell">
                {getConceptDisplay(condition.code)}
                <ConditionCategory condition={condition} />
              </TableCell>
              <TableCell className="table-cell">
                {`Severity: ${
                  getConceptDisplay(condition.severity) || 'Unspecified'}`}
                <br />
                {`Clinical Status: ${
                  getConceptDisplay(condition.clinicalStatus)
                      || 'Unspecified'}`}
                <br />
                {`Verification Status: ${
                  getConceptDisplay(condition.verificationStatus)
                      || 'Unspecified'}`}
              </TableCell>
              <TableCell className="table-cell">
                <ul className="condition-list-item">
                  <li>
                    <ConditionOnset condition={condition} />
                  </li>
                  <AdditionalNotes resource={condition} />
                </ul>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  </TableStyles>
) : (
  <div />
));


const conceptShape = {
  test: PropTypes.string,
  coding: PropTypes.object,
};

const conditionShape = {
  recordedDate: PropTypes.instanceOf(Date),
  code: PropTypes.shape(conceptShape),
  severity: PropTypes.shape(conceptShape),
  clinicalStatus: PropTypes.shape(conceptShape),
  verificationStatus: PropTypes.shape(conceptShape),
};

ConditionsComponent.propTypes = {
  conditionList: PropTypes.arrayOf(PropTypes.shape(conditionShape)),
};

ConditionsComponent.defaultProps = {
  conditionList: [],
};

export default ConditionsComponent;
