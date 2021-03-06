import React, { Component } from 'react';
import CategoryCard from "../CategoryCard";
import apiClient from '../../../helpers/apiClient';
import './category.css';
import Spinner from '../../Spinner/Spinner';

class CategoriesOverview extends Component {
    constructor() {
        super();
        this.state = {
            categoriesList: []
        }
    }
    componentDidMount() {
        let language = localStorage.getItem("language") || 'en';
        apiClient.getCategories()
            .then(({ data }) => {
                data.map((category) => {
                    if (language === "en") {
                        return category.title = category.title;
                    } else {
                       return category.title = category.titleTranslation[language]
                    }
                });
                this.setState({
                    categoriesList: data
                })
            })
    }
    render() {
        if (this.state.categoriesList.length === 0) {
            return <Spinner />
        } else {
            return (
                <div className="category-container">
                    {
                        this.state.categoriesList.map((category) => {
                            var icon = `/icons/${category.icon}.png`;
                            if (!category.icon) {
                                icon = '/icons/default-icon.png'
                            }
                            return (
                                <div className="category-item" key={category._id}>
                                    <CategoryCard title={category.title} alt={category.icon} src={icon} href={`/categories/${category._id}`} />
                                </div>
                            )
                        })
                    }
                </div>
            )
        }
    }
}
export default CategoriesOverview