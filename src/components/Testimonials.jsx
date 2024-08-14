import React, { useState, useEffect } from "react";
import "./Testimonials.css";
import { MdEdit, MdDelete, MdAddCircle } from "react-icons/md";
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const TestimonialForm = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [open, setOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(null);
  const [testimonialData, setTestimonialData] = useState({ comments: "", author: "" });
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [indexToDelete, setIndexToDelete] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetch("https://thestoryloft.in/api/testimonial", {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })
      .then(response => response.json())
      .then(data => {
        console.log('Fetched testimonials:', data);
        setTestimonials(data || []);
      })
      .catch(error => {
        console.error('Error fetching testimonials:', error);
        setErrorMessage("An error occurred while fetching testimonials. Please try again.");
      });
  }, [token]);

  const handleClickOpen = (edit = false, index = null) => {
    if (edit) {
      setIsEditing(true);
      setCurrentTestimonialIndex(index);
      setTestimonialData({
        comments: testimonials[index]?.message || "",
        author: testimonials[index]?.message_by || ""
      });
    } else {
      setIsEditing(false);
      setCurrentTestimonialIndex(null);
      setTestimonialData({ comments: "", author: "" });
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setCurrentTestimonialIndex(null);
  };

  const handleAdd = () => {
    if (token) {
      const formattedData = {
        message: testimonialData.comments,
        message_by: testimonialData.author
      };
  
      fetch("https://thestoryloft.in/api/testimonial", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(formattedData),
      })
      .then(response => {
        console.log("Raw response:", response);
        if (response.headers.get('Content-Type')?.includes('application/json')) {
          return response.json().then(newTestimonial => {
            if (response.ok) {
              setTestimonials(prev => [...prev, newTestimonial]);
              handleClose();
              window.location.reload(); 
            } else {
              throw new Error(newTestimonial.message || "Failed to add testimonial");
            }
          });
        } else {
          return response.text().then(text => {
            if (response.ok) {
              console.log(text); 
              handleClose();
              window.location.reload(); 
            } else {
              throw new Error(text);
            }
          });
        }
      })
      .catch(error => {
        console.error('Error adding testimonial:', error);
        setErrorMessage("An error occurred while adding the testimonial. Please try again.");
      });
    }
  };
  
  const handleEditSave = () => {
    if (currentTestimonialIndex !== null) {
      const idToUpdate = testimonials[currentTestimonialIndex]?.testimonial_id;
      if (idToUpdate && token) {
        const formattedData = {
          message: testimonialData.comments,
          message_by: testimonialData.author
        };
  
        fetch(`https://thestoryloft.in/api/testimonial/${idToUpdate}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
          body: JSON.stringify(formattedData),
        })
        .then(response => {
          console.log("Raw response:", response);
  
          if (response.headers.get('Content-Type')?.includes('application/json')) {
            return response.json().then(updatedTestimonial => {
              if (response.ok) {
                setTestimonials(prev =>
                  prev.map((item, index) =>
                    index === currentTestimonialIndex ? updatedTestimonial : item
                  )
                );
                handleClose();
                window.location.reload(); 
              } else {
                throw new Error(updatedTestimonial.message || "Failed to update testimonial");
              }
            });
          } else {
            return response.text().then(text => {
              if (response.ok) {
                console.log(text); 
                handleClose();
                window.location.reload(); 
              } else {
                throw new Error(text);
              }
            });
          }
        })
        .catch(error => {
          console.error('Error updating testimonial:', error);
          setErrorMessage("An error occurred while updating the testimonial. Please try again.");
        });
      }
    }
  };
  
  const handleDeleteConfirm = (index) => {
    console.log("Delete button clicked for index:", index);
    setDeleteConfirmOpen(true);
    setIndexToDelete(index);
  };

  const handleDelete = () => {
    if (indexToDelete !== null) {
      const idToDelete = testimonials[indexToDelete]?.testimonial_id;
      if (idToDelete && token) {
        fetch(`https://thestoryloft.in/api/testimonial/${idToDelete}`, {
          method: "DELETE",
          headers: {
            "Authorization": `Bearer ${token}`
          },
        })
          .then(response => {
            if (response.ok) {
              setTestimonials(prev => prev.filter((_, i) => i !== indexToDelete));
              handleDeleteClose();
            } else {
              return response.json().then(data => {
                throw new Error(data.message || "Failed to delete testimonial");
              });
            }
          })
          .catch(error => {
            setErrorMessage("An error occurred while deleting the testimonial. Please try again.");
            handleDeleteClose();
          });
      } else {
        console.error('No id found for testimonial:', idToDelete);
        setErrorMessage("Unable to delete testimonial. Please try again.");
        handleDeleteClose();
      }
    }
  };

  const handleDeleteClose = () => {
    setDeleteConfirmOpen(false);
    setIndexToDelete(null);
  };

  const handleDragStart = (e, index) => {
    e.dataTransfer.setData("index", index.toString());
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, newIndex) => {
    const droppedIndex = parseInt(e.dataTransfer.getData("index"), 10);
    const items = Array.from(testimonials);
    const [draggedItem] = items.splice(droppedIndex, 1);
    items.splice(newIndex, 0, draggedItem);
    setTestimonials(items);
  };

  return (
    <div className="testimonial-form">
      <h2 className="title">TESTIMONIALS</h2>
      <div className="add-button-container">
        <Button variant="outlined" onClick={() => handleClickOpen()} className="open-btn" startIcon={<MdAddCircle />}>
          Add
        </Button>
      </div>
      <div className="labels-container">
        <div className="label-comment">
          <h4>COMMENTS</h4>
        </div>
        <div className="label-by">
          <h4>Author</h4>
        </div>
      </div>
      <div className="testimonial-list">
        {testimonials.map((testimonial, index) => (
          <div
            key={testimonial?.id || index}
            className="testimonial-item"
            draggable
            onDragStart={(e) => handleDragStart(e, index)}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, index)}
          >
            <DragIndicatorIcon className="drag-icon" />
            <div className="input-container">
              <div className="comments">{testimonial?.message || 'No comments'}</div>
              <div className="author">{testimonial?.message_by || 'No author'}</div>
            </div>
            <div className="buttons-container">
              <button className="edit-btn" onClick={() => handleClickOpen(true, index)}>
                <MdEdit />
              </button>
              <button className="delete-btn" aria-label="Delete" onClick={() => handleDeleteConfirm(index)}>
                <MdDelete />
              </button>
            </div>
          </div>
        ))}
      </div>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{isEditing ? "Edit Testimonial" : "Add Testimonial"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {isEditing ? "Modify the details of the testimonial:" : "Enter the details of the new testimonial:"}
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Comment"
            type="text"
            fullWidth
            value={testimonialData.comments}
            onChange={(e) => setTestimonialData({ ...testimonialData, comments: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Author"
            type="text"
            fullWidth
            value={testimonialData.author}
            onChange={(e) => setTestimonialData({ ...testimonialData, author: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">Cancel</Button>
          <Button onClick={isEditing ? handleEditSave : handleAdd} color="primary">
            {isEditing ? "Save" : "Add"}
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={deleteConfirmOpen}
        onClose={handleDeleteClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Confirm Deletion"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this testimonial? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteClose} color="primary">Cancel</Button>
          <Button onClick={handleDelete} color="primary" autoFocus>Delete</Button>
        </DialogActions>
      </Dialog>

      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
};

export default TestimonialForm;
