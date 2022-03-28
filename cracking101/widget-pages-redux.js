const applicationGlobalState = {
  pages: {
    byId: {
      page1: {
        id: "page1",
        title: "page title 1",
        widgetList: ["widget1", "widget2"]
      },
      page2: {
        id: "page2",
        titlePage: "page title 2",
        widgetList: ["widget2", "widget3"]
      }
    },
    allIds: ["page1", "page2"]
  },
  widgets: {
    byId: {
      widget1: {
        id: "widget1",
        title: "widget title 1",
        body: "lorem"
      },
      widget2: {
        id: "widget2",
        title: "widget title 2",
        body: "lorem"
      },
      widget3: {
        id: "widget3",
        title: "widget title 3",
        body: "lorem"
      }
    },
    allIds: ["widget1", "widget2", "widget3"]
  }
};

const ADD_WIDGET_TO_PAGE = "ADD_WIDGET_TO_PAGE";
const EDIT_TEXT_OF_WIDGET = "EDIT_TEXT_OF_WIDGET";
function addWidgetToPage(payload) {
  return {
    type: ADD_WIDGET_TO_PAGE,
    payload
  };
}
function editTextOfWidget(payload) {
  return {
    type: EDIT_TEXT_OF_WIDGET,
    payload
  };
}

const store = {
  dispatch: action => {
    console.log(rootApplicationReducer(undefined, action));
  }
};
store.dispatch(
  addWidgetToPage({
    widgetId: "widget101",
    pageId: "page1"
  })
);
store.dispatch(
  editTextOfWidget({
    widgetId: "widget1",
    widgetBody: "blah-blah"
  })
);

function rootApplicationReducer(state = applicationGlobalState, action) {
  switch (action.type) {
    case ADD_WIDGET_TO_PAGE:
      return {
        ...state,
        pages: {
          byId: {
            ...state.pages.byId,
            [action.payload.pageId]: {
              ...state.pages.byId[action.payload.pageId],
              widgetList: [
                ...state.pages.byId[action.payload.pageId].widgetList,
                action.payload.widgetId
              ]
            }
          },
          allIds: [...state.pages.allIds, action.payload.widgetId]
        }
      };
    case EDIT_TEXT_OF_WIDGET:
      return {
        ...state,
        widgets: {
          byId: {
            ...state.widgets.byId,
            [action.payload.widgetId]: {
              ...state.widgets.byId[action.payload.widgetId],
              body: action.payload.widgetBody
            }
          },
          allIds: [...state.widgets.allIds, action.payload.widgetId]
        }
      };
    default:
      return state;
  }
}
