@props([
    'name',
    'label',
    'type' => 'text',
    'autocomplete' => 'off',
    'maxlength' => null,
    'toggle' => false,
])

<div class="mb-3">
    <label for="{{ $name }}" class="form-label">{{ $label }}</label>

    @if ($toggle)
        <div class="input-group has-validation">
            <input id="{{ $name }}" name="{{ $name }}" type="{{ $type }}" class="form-control"
                   autocomplete="{{ $autocomplete }}" aria-describedby="{{ $name }}-error"
                   @if ($maxlength) maxlength="{{ $maxlength }}" @endif required>
            <button type="button" class="btn btn-outline-dark" data-toggle-password="{{ $name }}"
                    aria-pressed="false">Tampilkan</button>
            <div id="{{ $name }}-error" class="invalid-feedback"></div>
        </div>
    @else
        <input id="{{ $name }}" name="{{ $name }}" type="{{ $type }}" class="form-control"
               autocomplete="{{ $autocomplete }}" aria-describedby="{{ $name }}-error"
               @if ($type !== 'password') value="{{ old($name) }}" @endif
               @if ($maxlength) maxlength="{{ $maxlength }}" @endif required>
        <div id="{{ $name }}-error" class="invalid-feedback"></div>
    @endif
</div>
