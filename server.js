require('dotenv').config()

const express = require('express')
const app = express()
const jwt = require('jsonwebtoken')

app.use(express.json())

const posts = [{
    username: 'jim',
    title: 'Post 1',
    Hasil: {
        Status: "True",
        ErrorCode: "-",
        ErrorDescription: "-",
        Data: [{
                NOPPBB: "xxx",
                nama: "Nama Obyek Pajak",
                alamat: "Jalan XYZ",
                Kabupaten: "Nama Kab",
                kecamatan: "NamaKec",
                desa: "Nama Desa",
                rt: "RT xxx",
                rw: "RW yyyy",
                data_pbb: [{
                        tahun: 2019,
                        pajak: 100000,
                        denda: 1000
                    },
                    {
                        tahun: 2020,
                        pajak: 100000,
                        denda: 0
                    }
                ]
            },

            {
                NOPPBB: "xxx002",
                nama: "NamaObyek Pajak2",
                alamat: " Jalan XYZ 2",
                kabupaten: "Nama Kab 2",
                kecamatan: "Nama Kec 2",
                desa: "Nama Desa 2",
                rt: "RT xxx 2",
                rw: "RW yyyy2 ",
                data_pbb: [{
                        tahun: 2019,
                        pajak: 100000,
                        denda: 1000
                    },
                    {
                        tahun: 2021,
                        pajak: 100000,
                        denda: 0
                    }
                ]
            }
        ]
    }
}]

app.get('/posts', authenticateToken, (req, res) => {
    res.json(posts.filter(post => post.username === req.user.name))
})

app.post('/login', (req, res) => {
    const username = req.body.username
    const user = { name: username }

    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)
    res.json({ accessToken: accessToken })
})

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.sendStatus(401)

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403)
        req.user = user
        next()
    })
}

app.listen(3000)