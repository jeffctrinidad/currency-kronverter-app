import React, { useState, useRef, useEffect } from 'react'
import NavBar from '../../components/NavBar'
import _ from 'lodash'
import { Search, Image, Table, Button, Input, Grid } from 'semantic-ui-react'
import { useLazyQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import { Redirect } from 'react-router'

const GET_COUNTRY_DETAILS = gql`
  query searchCountry($keyword: String!) {
    searchCountry(searchInput: { keyword: $keyword }) {
      countries {
        name
        population
        currencies {
          name
          symbol
          code
          sekRate
        }
        flag
      }
    }
  }
`

const Home = () => {
  const [countries, setCountries] = useState([])
  const [amount, setAmount] = useState()
  const amountInput = useRef(null)
  const [getCountryDetails, { loading, data, error }] = useLazyQuery(
    GET_COUNTRY_DETAILS
  )
  const handleResultSelect = (event, { result }) => {
    setCountries([...countries, result])
  }

  const handleCompute = () => {
    setAmount(amountInput.current.value)
  }

  const resultRenderer = ({ name, flag }) => {
    return (
      <div>
        <Image src={flag} size='small' />
        {name}
      </div>
    )
  }

  const findCountry = (event, data) => {
    if (data.value.length >= 2)
      getCountryDetails({ variables: { keyword: data.value } })
  }

  useEffect(() => {
    if (error) {
      localStorage.removeItem('accessToken')
    }
  }, [error])

  if (error) {
    return <Redirect to='/'></Redirect>
  }

  return (
    <div>
      <NavBar />
      <Grid padded>
        <Grid.Row>
          <Grid.Column floated='left' width={5}>
            <Search
              size='large'
              loading={loading}
              onResultSelect={handleResultSelect}
              onSearchChange={_.debounce(findCountry, 500, {
                leading: true,
              })}
              results={
                data?.searchCountry?.countries.map((country) => ({
                  ...country,
                  title: country.name,
                })) || []
              }
              resultRenderer={resultRenderer}
            />
          </Grid.Column>
          <Grid.Column floated='right' width={5}>
            <div>
              <Input
                input={{ ref: amountInput }}
                label={{ basic: true, content: 'kr' }}
                labelPosition='left'
                placeholder='amount'
              />

              <Button
                style={{ marginLeft: '10px' }}
                primary
                onClick={handleCompute}
              >
                Compute
              </Button>
            </div>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <Table>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Flag</Table.HeaderCell>
                  <Table.HeaderCell>Name</Table.HeaderCell>
                  <Table.HeaderCell>Population</Table.HeaderCell>
                  <Table.HeaderCell>Currency Name</Table.HeaderCell>
                  <Table.HeaderCell>Currency Symbol</Table.HeaderCell>
                  <Table.HeaderCell>Currency Code</Table.HeaderCell>
                  <Table.HeaderCell>Exchange Rate</Table.HeaderCell>
                  <Table.HeaderCell>Local Rate</Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {countries.map((country) =>
                  country.currencies.map((currency, index) => (
                    <Table.Row key={index}>
                      {index === 0 && (
                        <>
                          <Table.Cell rowSpan={country.currencies.length}>
                            <Image src={country.flag} size='tiny' />
                          </Table.Cell>
                          <Table.Cell rowSpan={country.currencies.length}>
                            {country.name}
                          </Table.Cell>
                          <Table.Cell rowSpan={country.currencies.length}>
                            {country.population}
                          </Table.Cell>
                        </>
                      )}
                      <Table.Cell>{currency.name}</Table.Cell>
                      <Table.Cell>{currency.symbol}</Table.Cell>
                      <Table.Cell>{currency.code}</Table.Cell>
                      <Table.Cell>{currency.sekRate.toFixed(2)}</Table.Cell>
                      <Table.Cell>
                        {amount
                          ? (amount / currency.sekRate.toFixed(2)).toFixed(2)
                          : (0).toFixed(2)}
                      </Table.Cell>
                    </Table.Row>
                  ))
                )}
              </Table.Body>
            </Table>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  )
}

export default Home
