import React from 'react'
import Layout from '../Components/Layout'
import { Link } from '@mui/material'
import Banner from "../Images/banner.jpeg"
import "../style/HomeStyle.css";

const Home = () => {
  return (
    <Layout>
      <div className="home" style={{backgroundImage:`url(${Banner})`}}>
        <div className="headerContainer">
          <h1>Food website</h1>
          <p>Best Food in Indea</p>
          <Link>
            <button>
              ORDER NOW
            </button>
          </Link>
        </div>
      </div>
    </Layout>
  )
}

export default Home
