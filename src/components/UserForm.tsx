import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../app/store";
import type { User } from "../types/User";
import { addUser, updateUser } from "../features/users/usersSlice";
import {
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";

interface Props {
  user?: User;
  onClose?: () => void;
}

export default function UserForm({ user, onClose }: Props) {
  const dispatch = useDispatch();

  const users = useSelector((state: RootState) => state.users.users);

  const [open, setOpen] = useState(!!user);
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [errors, setErrors] = useState({
    name: "",
    email: "",
  });

  const validate = () => {
    const newErrors = {
      name: "",
      email: "",
    };

    if (!name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Invalid email";
    }

    setErrors(newErrors);

    return !newErrors.name && !newErrors.email;
  };

  const handleSave = () => {
    if (!validate()) return;

    if (user) {
      dispatch(
        updateUser({
          ...user,
          name,
          email,
        }),
      );
    } else {
      const newId = users.length ? Math.max(...users.map((u) => u.id)) + 1 : 1;

      dispatch(
        addUser({
          id: newId,
          name,
          email,
          status: "active",
        }),
      );
    }

    setName("");
    setEmail("");
    setErrors({ name: "", email: "" });
    setOpen(false);
    onClose?.();
  };

  return (
    <>
      {!user && (
        <Button
          className="add-btn"
          variant="contained"
          onClick={() => setOpen(true)}
        >
          Add User
        </Button>
      )}

      <Dialog
        open={open}
        onClose={() => {
          setOpen(false);
          onClose?.();
        }}
      >
        <DialogTitle>{user ? "Edit User" : "Create User"}</DialogTitle>

        <DialogContent>
          <TextField
            label="Name"
            fullWidth
            margin="normal"
            value={name}
            onChange={(e) => setName(e.target.value)}
            error={!!errors.name}
            helperText={errors.name}
          />

          <TextField
            label="Email"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={!!errors.email}
            helperText={errors.email}
          />
        </DialogContent>

        <DialogActions>
          <Button
            onClick={() => {
              setOpen(false);
              onClose?.();
            }}
          >
            Cancel
          </Button>
          <Button variant="contained" onClick={handleSave}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
