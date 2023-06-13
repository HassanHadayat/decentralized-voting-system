import { View, Text, StyleSheet, SafeAreaView, StatusBar, ScrollView, TextInput, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import TopNavBar from '../../../components/TopNavBar';
import ScreenName from '../../../components/ScreenName';
import { COLORS } from '../../../colors';
import { useEth } from "../../../contexts/contexts";
import { ContractName } from "../../../contexts/EthContext/ContractName";
import Web3Converter from '../../../../utils/Web3Converter';
import DocumentPicker from 'react-native-document-picker'
import { DataTable } from 'react-native-paper';
import csv from 'csvtojson';
const AddPoliticalPartyScreen = () => {
  const { state: contracts, } = useEth();

  const [party, setParty] = useState("");
  const [cC, setCC] = useState("");
  const [pA, setPA] = useState("");
  const [alias, setAlias] = useState("");

  // const [data, setData] = useState(null)
  // const [errorMessage, setErrorMessage] = useState(null);
  const [page, setPage] = React.useState(0);
  const [numberOfItemsPerPage, setNumberOfItemsPerPage] = React.useState(10);

  const [state, setState] = React.useState({
    tableHead: [],
    tableData: [
      []
    ],
    currentPageData: [
      []
    ],
    numberOfPages: 1
  });


  useEffect(() => {

    setCurrentPageData();
  }, [page]);

  useEffect(() => {
    setCurrentPageData();
  }, [state.tableData]);

  const setCurrentPageData = () => {
    const startIndex = page * numberOfItemsPerPage;
    let endIndex = startIndex + numberOfItemsPerPage;
    if (endIndex > state.tableData.length) {
      endIndex = state.tableData.length - 1;
    }
    if (state.tableData.length > 1) {
      setState({
        ...state,
        currentPageData: state.tableData.slice(startIndex, endIndex)
      });
    }
  }

  const setTableData = (csvFileUrl) => {
    fetch(csvFileUrl)
      .then(async (response) => {
        const resp = await response.text();
        csv({
          noheader: true,
          output: "csv"
        }).fromString(resp)
          .then((csvRow) => {
            let pages = (csvRow.length / numberOfItemsPerPage);
            if (csvRow.length > numberOfItemsPerPage * pages) {
              pages = pages + 1;
            }
            setState({
              ...state,
              tableHead: csvRow[0],
              tableData: csvRow.slice(1),
              numberOfPages: pages
            });
          })
      })
      .catch((error) => {
        console.error("some error occurred", error);
      });
  }

  const handleAddParty = async () => {
    try {
      var _party_cands = [];
      var _party_cands_constituencies = [];

      state.tableData.forEach(cand => {
        _party_cands.push(Web3Converter.strToBytes16(cand[3]));
        // FIXME cand[6]
        _party_cands_constituencies.push(Web3Converter.strToBytes8(cand[6]));
      });
      const party = {
        name: Web3Converter.strToBytes32(party),
        chairman_cnic: Web3Converter.strToBytes16(cC),
        postal_add: Web3Converter.strToBytes32(pA),
        _alias: Web3Converter.strToBytes8(alias)
      }
      const resp = await contracts.initialized[ContractName.PartyManager].contract.methods
        .addParty(
          party.name, party.chairman_cnic, party.postal_add, party._alias,
          _party_cands, _party_cands_constituencies
        )
        .send({ from: contracts.initialized[ContractName.PartyManager].accounts[0] ,gas: "10000000"});
      
    } catch (err) {
      console.log(err)
    }
  }

  const handleFileUpload = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });

      if (res[0].type === 'text/comma-separated-values') {
        const fileUploaded = res[0].uri;
        // const csv = await csvParse(fileUploaded);
        setTableData(fileUploaded);
        // setData(csv);
      } else {
        console.log('Invalid file format. Please select a CSV file.');
      }
    } catch (error) {
      console.log('Error:', error);
    }
  };




  return (
    <ScrollView style={styles.container}>
      <StatusBar />
      <TopNavBar />
      <View style={styles.mainContainer}>
        <ScreenName heading={"Add Political Party"} center={true} />
        <TextInput style={styles.input} placeholderTextColor={'black'} placeholder="Party Name" value={party} onChangeText={setParty} />
        <TextInput style={styles.input} placeholderTextColor={'black'} placeholder='Chairman Cnic' value={cC} onChangeText={setCC} />
        <TextInput style={styles.input} placeholderTextColor={'black'} placeholder='Postal Address' value={pA} onChangeText={setPA} />
        <TextInput style={styles.input} placeholderTextColor={'black'} placeholder='Alias' value={alias} onChangeText={setAlias} />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleFileUpload}>
          <Text style={styles.text}>Add Candidates</Text>
        </TouchableOpacity>
        <View style={styles.tableContainer}>
          <DataTable>
            <DataTable.Header>
              {
                state.tableHead.map((rowData, index) => (
                  <DataTable.Title key={index}>{rowData}</DataTable.Title>
                ))
              }
            </DataTable.Header>

            {
              state.currentPageData.map((rowData, index) => (
                <DataTable.Row key={index}>
                  {
                    rowData.map((cellData, cellIndex) => (
                      <DataTable.Cell key={cellIndex}>{cellData}</DataTable.Cell>
                    ))
                  }
                </DataTable.Row>
              ))
            }

            <DataTable.Pagination
              page={page}
              numberOfPages={state.numberOfPages}
              onPageChange={(page) => setPage(page)}
              label={`Page ${page + 1} of ${state.numberOfPages}`}
              showFastPagination
              optionsLabel={'Rows per page'}
            />
          </DataTable>
        </View>
        <TouchableOpacity style={styles.button} onPress={handleAddParty}>
          <Text style={styles.text}>Add</Text>
        </TouchableOpacity>
      </View>

    </ScrollView>
  )
}
const styles = StyleSheet.create({
  tableContainer: { flex: 1, padding: 4, paddingTop: 4, backgroundColor: '#fff' },
  head: {
    height: 40, backgroundColor: '#f1f8ff', color: '#fff'
  },
  text: { margin: 6 },
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  mainContainer: {
    paddingHorizontal: 40,
    marginTop: 100
  },
  input: {
    minHeight: 50,
    marginTop: 31,
    paddingLeft: 12,
    backgroundColor: "rgba(255,255,255,40)",
    color: "black",
    borderRadius: 6,
    elevation: 10
  },
  buttonContainer: {
    alignItems: 'center',
    marginTop: 30
  },
  button: {
    minWidth: '75%',
    minHeight: 40,
    backgroundColor: COLORS.main,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 6,
    marginBottom: 10
  },
  text: {
    color: 'white'
  }
});

export default AddPoliticalPartyScreen;