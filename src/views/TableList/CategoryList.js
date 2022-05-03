import React from "react";
import GridItem from "../../components/Grid/GridItem.jsx";
import GridContainer from "../../components/Grid/GridContainer.jsx";
//import image from "../../assets/img/sidebar-2.jpg";
//import image from "../../../public/sidebar-2.jpg";
import * as actions from '../../actions/index';
import { connect } from 'react-redux';
import MUIDataTable from "mui-datatables";
import Edit from "@material-ui/icons/Edit";
import Server from '../../config'

class CategoryList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      categoryData: [],
      //image: image,
      image: Server.SIDEBAR_BACK_IMAGE_URL,
      color: "blue",
      hasImage: true,
      fixedClasses: "dropdown show",
      mobileOpen: false
    };
  }

  componentWillMount() {
    this.props.getAllCategoryList()
  }

  componentWillReceiveProps(props) {
    let categoryList = []
    if (props.category.get_category_data !== undefined && props.category.get_category_data !== null) {
      props.category.get_category_data.map((prop, key) => {
        categoryList.push(prop)
      })
      this.setState({ categoryData: categoryList })
    }
  }

  render() {
    const columns = [
      //{ name: "image", label: "Image", options: { filter: true, sort: true, } },
      { name: "c_name", label: "Category name", options: { filter: true, sort: true, } },
      { name: "e_count", label: "Event count", options: { filter: true, sort: true, } },
      { name: "action", label: "Action" },
    ];

    let icon = <Edit></Edit> 

    return (
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <MUIDataTable
            title={"Category List1"}
            data={this.state.categoryData.map(item => {
              return [
                //src,
                item.category_name,
                item.cat_id_count,
                icon
                //item.gender,
                //item.country
              ]
            })}
            columns={columns}
          />
        </GridItem>
      </GridContainer>
    )
  }
}

const mapStateToProps = state => ({
  category: state.Category,
})

const mapDispatchToProps = dispatch => ({
  getAllCategoryList: () => { dispatch(actions.getAllCategoryList()) }
});

export default connect(mapStateToProps, mapDispatchToProps)(CategoryList);

