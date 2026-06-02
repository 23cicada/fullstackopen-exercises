import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import useQueryUsers from '../hooks/useQueryUsers'
import Typography from '@mui/material/Typography'
import { Link } from 'react-router-dom'

const Users = () => {
  const { data = [] } = useQueryUsers()
  return (
    <div>
      <Typography variant="h4" sx={{ mb: 2 }}>
        Users
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>UserName</TableCell>
              <TableCell>Blogs created</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <TableRow key={row.name}>
                <TableCell>
                  <Link to={`/users/${row.id}`}>{row.name}</Link>
                </TableCell>
                <TableCell>{row.username}</TableCell>
                <TableCell>{row.blogs.length}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default Users
