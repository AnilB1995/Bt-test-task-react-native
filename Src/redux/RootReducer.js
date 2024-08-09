const initialState = {
    AddCart: {},
    QTY:{}
  }
  
  export default function RootReducer(state = initialState, action) {
    switch (action.type) {
      case 'ADD_Cart':
        let data = {...state.AddCart};
        data[action.payload.id] = action.payload;
        return {...state, AddCart: data};
      case 'Add_MORE_CART':
        return {...state,QTY:action.payload}

      default:
        return {...state};
    }
  }