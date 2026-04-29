"""
Run this script FIRST to check your model details.
Run from: AgroGuard-AI/server/ folder
Command: python check_model.py
"""
import os, sys

print("=" * 55)
print("  AgroGuard AI — Model Diagnostic Tool")
print("=" * 55)

# Check model file exists
model_path = "../models/tomato_disease_model.h5"
abs_path   = os.path.abspath(model_path)
print(f"\n1. Model path: {abs_path}")
print(f"   Exists: {os.path.exists(abs_path)}")

if not os.path.exists(abs_path):
    # Try alternate paths
    for p in ["models/tomato_disease_model.h5",
              "../../models/tomato_disease_model.h5",
              "../tomato_disease_model.h5"]:
        if os.path.exists(p):
            print(f"   FOUND at: {os.path.abspath(p)}")
            break
    else:
        print("   ❌ Model file NOT FOUND anywhere!")
        print("   Make sure tomato_disease_model.h5 is in AgroGuard-AI/models/")
        sys.exit(1)

# Check TensorFlow
print("\n2. TensorFlow version:")
try:
    import tensorflow as tf
    print(f"   Version: {tf.__version__}")
    print(f"   keras available: {hasattr(tf, 'keras')}")
except ImportError:
    print("   ❌ TensorFlow not installed!")
    sys.exit(1)

# Try loading model
print("\n3. Loading model...")
try:
    # Try method 1 - standard
    model = tf.keras.models.load_model(abs_path)
    print(f"   ✅ Model loaded!")
    print(f"   Input shape:  {model.input_shape}")
    print(f"   Output shape: {model.output_shape}")
    num_classes = model.output_shape[-1]
    print(f"   Number of classes: {num_classes}")
    
    # Show expected class order
    print(f"\n4. Expected class mapping (alphabetical):")
    import pathlib
    dataset_path = "../dataset/plantvillage"
    if os.path.exists(dataset_path):
        folders = sorted([f for f in os.listdir(dataset_path)
                         if os.path.isdir(os.path.join(dataset_path, f))])
        for i, f in enumerate(folders):
            print(f"   Index {i} → {f}")
    else:
        print("   Dataset folder not found — using known order:")
        print("   Index 0 → Early_blight (or Tomato__Early_blight)")
        print("   Index 1 → Healthy (or Tomato__healthy)")
        print("   Index 2 → Late_blight (or Tomato__Late_blight)")

    # Test inference
    print(f"\n5. Test inference with random image:")
    import numpy as np
    h, w = model.input_shape[1], model.input_shape[2]
    dummy = np.random.rand(1, h, w, 3).astype(np.float32)
    preds = model.predict(dummy, verbose=0)[0]
    print(f"   Input size: {h}x{w}")
    print(f"   Raw output: {preds}")
    print(f"   Best class: index {np.argmax(preds)} with {max(preds)*100:.1f}%")

except Exception as e:
    print(f"   ❌ Failed to load: {e}")
    print("\n   Trying legacy loader...")
    try:
        model = tf.keras.models.load_model(abs_path, compile=False)
        print(f"   ✅ Loaded with compile=False!")
        print(f"   Input shape: {model.input_shape}")
    except Exception as e2:
        print(f"   ❌ Legacy also failed: {e2}")

print("\n" + "=" * 55)
print("  Run complete. Check output above.")
print("=" * 55)