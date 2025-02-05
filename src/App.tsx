import './App.css'
import BillGrid from '@/components/bill-grid'

const sampleBills = [
  {
    id: 1,
    item: {
      code: "HB-123",
      title: "Sample Bill 1",
      sponsor: "John Doe",
      action: "Pending"
    }
  },
  {
    id: 2,
    item: {
      code: "SB-456",
      title: "Sample Bill 2",
      sponsor: "Jane Smith",
      action: "Approved"
    }
  }
]


function App() {
  return (
    <>
      <BillGrid items={sampleBills}/>
    </>

  )
}


export default App
