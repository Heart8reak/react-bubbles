import React, { useState } from "react";
import axiosWithAuth from "../auth/axiosWithAuth";

const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, updateColors }) => {
  console.log(colors);
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);
  const [newColor, setNewColor] = useState({
    code: { hex: '' },
    color: '',
    id: Date.now()
  })

  const editColor = (color) => {
    setEditing(true);
    setColorToEdit(color);
  };

  const saveEdit = (e) => {
    e.preventDefault();
    // Make a put request to save your updated color
    // think about where will you get the id from...
    // where is is saved right now?
    axiosWithAuth()
      .put(`/colors/${colorToEdit.id}`, colorToEdit)
      .then(() => {
        alert('Color Updated')
        axiosWithAuth()
          .get(`/colors`)
          .then(res => updateColors(res.data))
          .catch(err => console.log(err))
        setEditing(false)
      })
      .catch((err) => {
        console.log("Error", err)
      })
  };

  const deleteColor = (color) => {
    // make a delete request to delete this color
    axiosWithAuth()
      .delete(`/colors/${color.id}`, color)
      .then((res) => {
        alert('Color Deleted')
        axiosWithAuth()
          .get(`/colors`)
          .then(res => updateColors(res.data))
          .catch(err => console.log(err))
        setEditing(false)
        console.log(res)
      })
      .catch((err) => {
        console.log("error", err)
      })
  };

  const createColorSubmit = (e) => {
    e.preventDefault()
    axiosWithAuth()
      .post(`/colors`, newColor)
      .then(() => {
        alert('New Color Created')
        axiosWithAuth()
          .get(`/colors`)
          .then(res => updateColors(res.data))
          .catch(err => console.log(err))
      })
  }

  const createColorChange = (e) => {
    e.preventDefault()
    setNewColor({
      ...newColor,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span className="delete" onClick={e => {
                e.stopPropagation();
                deleteColor(color)
              }
              }>
                x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={(e) =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={(e) =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
      <div className="spacer" />
      {/* stretch - build another form here to add a color */}

      <form onSubmit={createColorSubmit}>
        <h2>Add a New Color</h2>
        <input
          type='text'
          name='color'
          value={newColor.color}
          onChange={createColorChange}
          placeholder='New Color Name'
        />
        <input
          type='text'
          name='code '
          value={newColor.code.hex}
          onChange={e => setNewColor({
            ...colorToEdit,
            code: { hex: e.target.value }
          })}
          placeholder='New Hex Code'
        />
        <button type='submit'>Create Color</button>
      </form>
    </div>
  );
};

export default ColorList;
