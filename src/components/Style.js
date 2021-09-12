import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex:1
  },
  
  textInputContainer : {
    marginBottom: 15,
  },
  textInputTitle: {
    fontSize: 12,
    textTransform: 'uppercase',
    fontWeight: '300'
  },
  textInputField: {
    flexDirection: 'row',
    marginTop: 7,
    borderWidth: 1,
    borderRadius: 10,
    height: 40,
    paddingLeft: 10,
    paddingRight: 10,
  },
  buttonContainer: {
    marginTop: 0,
    marginRight: 32,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0217cf',
    borderRadius: 6
  },
  buttonText: {
    fontSize: 20,
    textAlign: 'center'
  }
});