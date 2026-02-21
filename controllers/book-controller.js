const Book = require('../models/book')

const getAllBooks = async(req,res) => {
   try{
      const allBooks = await Book.find({})
      if(allBooks.length > 0 ){
        res.status(200).json({
          success: true,
          message:'List of books fetched successfully',
          data: allBooks
        })
      }
      else{
        res.status(404).json({
          success: false,
          message: 'No Books found in collection'
        })
      }
   } catch(e){
       console.log(e)
       res.status(500).json({
        success: false,
        message: 'Something went wrong please try again!'
       })
   }
}

const getSingleBookById = async(req,res) => {
   try{
      const getCurrentBookId = req.params.id 
      const bookDetailsByID = await Book.findById(getCurrentBookId)
      if(!bookDetailsByID){
        return res.status(404).json({
          success: 404,
          message: 'Book with current Id is not found, please try with different id'
        })
      }
      res.status(200).json({
        success: true,
        message: 'Book found Successfully',
        data: bookDetailsByID
      })
   }catch(e){
    console.log(e)
    res.status(500).json({
      success: false,
      message: 'Something went wrong please try again!'
    })
   }

}

const addNewBook = async(req,res) => {
  try{
     const newBookFormData = req.body;
     const newlyCreatedBook = await Book.create(newBookFormData)
     if(newBookFormData){
        res.status(201).json({
            success : true,
            message : 'Book added successfully',
            data : newlyCreatedBook
        })
     }
  }catch(e){
    console.error(e)
     res.status(500).json({
        success: false,
        message: 'Something went wrong please try again!'
       })
  }
}

const updateBook = async(req,res) => {
    try{
      const updatedBookFormData = req.body 
      const currentBookId = req.params.id
      const updatedBook = await Book.findByIdAndUpdate(currentBookId,updatedBookFormData,{
        new: true//this will give the updated book back
      })
      if(!updatedBook){
        return res.status(404).json({
          success: false,
          message: 'Book Not found with the given Id'
        })
      }
      res.status(200).json({
        success: true,
        message: 'Book updated Successfully',
        data: updatedBook
      })

    }catch(e){
      console.log(e)
      res.status(500).json({
        success: false,
        message: 'Something went wrong please try again!'
      })
    }
}

const deleteBook = async(req,res) => {
    try{
       const getCurrentBookId = req.params.id 
       const deletedBook = await Book.findByIdAndDelete(getCurrentBookId)
       if(!deletedBook){
        return res.status(404).json({
          success: false,
          message: 'Book is not found with this Id'
        })
       }
       res.status(200).json({
        success: true,
        data: deletedBook
       })
    }catch(e){
      console.log(e)
      res.status(500).json({
        success: false,
        message: 'Something went wrong, please try again!'
      })
    }
}

module.exports = {getAllBooks,getSingleBookById,addNewBook,updateBook,deleteBook};