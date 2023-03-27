export function home (req, res) {
   console.log(req)
   return res.json({message: 'Hello from the API'})
}
