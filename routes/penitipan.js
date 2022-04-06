import fs from 'fs';
import express from 'express';
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();

const file = fs.readFileSync('db/penitipan.json', 'utf8')
const penitipan = JSON.parse(file)


//get all data
router.get('/', (req, res) => {
    res.json(penitipan)
});

//post data
router.post('/', (req, res) => {
  const body = req.body
  const idPenitipan = uuidv4()
  let penitipanWithId = {...body, id : idPenitipan};
  
  const duplikat = penitipan.find((titip) => titip.id === penitipanWithId.id)

  if(duplikat)
  {
    res.json({
      "message" : "Barang sudah ada!"
    })
  }else{
    penitipan.push(penitipanWithId)
    fs.writeFileSync('db/penitipan.json', JSON.stringify(penitipan))
    res.json({
      "message" : "Barang berhasil diajukan!",
      "data" : penitipan
    })
  }

  })

  //find data by id
  router.delete('/:id', (req, res) => {
    const {id} = req.params
    const newPenitipan = penitipan.filter((titip) => titip.id !== id)
    if(penitipan.length === newPenitipan.length)
    {
      res.json({"message": "Data tidak ditemukan"})
    }else{
      fs.writeFileSync('db/penitipan.json', JSON.stringify(newPenitipan))
      res.json({
        "message": "Data berhasil dihapus",
        "data": newPenitipan
    })
    }
  })


  //update data
  router.put('/:id', (req, res) => {
    const { id } = req.params
    const newData = penitipan.filter((titip) => titip.id !== id)

    if(penitipan.length === newData.length)
    {
      res.json({"message": "Data tidak ditemukan"})
    }else{
      const data = {
        "id" : id,
        "namaBarang" : req.body.namaBarang,
        "namaPenitip" : req.body.namaPenitip
      }

      newData.push(data)
      fs.writeFileSync('db/penitipan.json', JSON.stringify(newData))
      res.json({
        "message": "Data berhasil diupdate!",
        "data": newData
    })
    }
  })

export default router;